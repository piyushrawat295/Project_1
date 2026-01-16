"use server";

import { db } from "@/lib/db";
import { beneficiaries, projects, teamMembers, ngos, events, campaigns, documents, proposals, csrOpportunities } from "@/lib/schema";
import { eq, desc, and, ilike, or, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

// --- Beneficiaries ---

export async function getBeneficiaries(query?: string, category?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    // Build conditions
    const conditions = [eq(beneficiaries.ngoId, ngo.id)];
    
    if (category && category !== "All Status") { // "All Status" comes from UI sometimes
       const validCategories = ["Child", "Women", "Elderly", "Other"];
       if (validCategories.includes(category)) {
          conditions.push(eq(beneficiaries.category, category));
       }
    }

    if (query) {
      const search = or(
        ilike(beneficiaries.name, `%${query}%`),
        ilike(beneficiaries.location, `%${query}%`)
      );
      if (search) {
        conditions.push(search);
      }
    }

    const data = await db.select({
      id: beneficiaries.id,
      name: beneficiaries.name,
      age: beneficiaries.age,
      gender: beneficiaries.gender,
      category: beneficiaries.category,
      project: projects.title,
      location: beneficiaries.location,
      registeredAt: beneficiaries.registeredAt,
    })
    .from(beneficiaries)
    .leftJoin(projects, eq(beneficiaries.projectId, projects.id))
    .where(and(...conditions))
    .orderBy(desc(beneficiaries.registeredAt));

    // Calculate stats
    // Note: These stats should be over ALL beneficiaries, not just filtered ones, usually?
    // But for the top cards, we usually want totals.
    const allBeneficiaries = await db.select().from(beneficiaries).where(eq(beneficiaries.ngoId, ngo.id));
    
    const stats = {
      total: allBeneficiaries.length,
      children: allBeneficiaries.filter(b => b.category === 'Child').length,
      women: allBeneficiaries.filter(b => b.category === 'Women').length,
      elderly: allBeneficiaries.filter(b => b.category === 'Elderly').length,
    };

    return { data, stats };

  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    return { error: "Failed to fetch beneficiaries" };
  }
}

// --- Projects ---

export async function getProjects(query?: string, status?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    const conditions = [eq(projects.ngoId, ngo.id)];

    if (status && status !== "All") {
        if (status === 'Funded') {
             // Logic for funded? Status might be 'active' and raised >= budget?
             // Or just use status field matches.
             // Let's assume there's a status enum or string in DB: 'active', 'completed', 'seeking_funding'
        } else {
             conditions.push(eq(projects.status, status.toLowerCase().replace(' ', '_')));
        }
    }

    if (query) {
       conditions.push(ilike(projects.title, `%${query}%`));
    }

    const data = await db.select().from(projects)
      .where(and(...conditions))
      .orderBy(desc(projects.createdAt));

    // Stats
    const allProjects = await db.select().from(projects).where(eq(projects.ngoId, ngo.id));
    
    // Calculate total budget properly handling nulls
    const totalBudget = allProjects.reduce((sum, p) => sum + (p.totalBudget || 0), 0);
    
    const stats = {
      total: allProjects.length,
      active: allProjects.filter(p => p.status === 'active').length,
      seeking_funding: allProjects.filter(p => p.status === 'seeking_funding').length,
      totalBudget: totalBudget
    };

    return { data, stats };

  } catch (error) {
    console.error("Error fetching projects:", error);
    return { error: "Failed to fetch projects" };
  }
}

// --- Volunteers (mapped to Team Members for now) ---

export async function getVolunteers(query?: string, status?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
     const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    // We will assume "rolename" containing 'Volunteer' are volunteers
    // Since we don't have a status, we'll return all as active for now? 
    // Or we just return them. The UI distinguishes Active vs Pending. 
    // Current DB schema doesn't support status for team members.
    // We will just return them and maybe mock status in UI or randomize for demo if acceptable, 
    // but better to just show them as Active if we can't tell.
    // UNLESS we use 'role' to store status? e.g. "Volunteer (Pending)"? 
    // That's a bit hacky but works without schema change.
    // For now, let's just fetch them.

    const conditions = [
        eq(teamMembers.ngoId, ngo.id),
        // ilike(teamMembers.role, '%Volunteer%') // Only fetch if they have volunteer in role name?
        // Or maybe fetch ALL team members and let client side filter? 
        // Let's filter for anything that looks like a volunteer or if distinct from staff.
        // Actually, let's just fetch all team members for now, or maybe only those with role 'Volunteer'
    ];
    // Adding filter for 'Volunteer' role to separate from Board Members/Staff if possible.
    // If table is empty, user might need to seed data.
    
    if (query) {
        conditions.push(ilike(teamMembers.name, `%${query}%`));
    }

    const data = await db.select().from(teamMembers)
        .where(and(...conditions))
        .orderBy(desc(teamMembers.createdAt));
    
    const stats = {
        total: data.length,
        active: data.length, // Placeholder
        pending: 0, // Placeholder
        totalHours: 250 // Placeholder (no field for hours in DB)
    };

    return { data, stats };

  } catch (error) {
      console.error("Error fetching volunteers:", error);
      return { error: "Failed to fetch volunteers" };
  }
}


// --- Events ---

export async function getEvents(query?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
     const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    const conditions = [eq(events.ngoId, ngo.id)];
    
    if (query) {
      conditions.push(ilike(events.title, `%${query}%`));
    }

    const data = await db.select().from(events)
      .where(and(...conditions))
      .orderBy(desc(events.date));
    
    // Stats
    const allEvents = await db.select().from(events).where(eq(events.ngoId, ngo.id));
    const upcoming = allEvents.filter(e => e.status === 'upcoming').length;
    
    const stats = {
      total: allEvents.length,
      upcoming,
      completed: allEvents.filter(e => e.status === 'past').length
    };

    return { data, stats };

  } catch (error) {
    console.error("Error fetching events:", error);
    return { error: "Failed to fetch events" };
  }
}

// --- Campaigns (Funding) ---

export async function getCampaigns(query?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
     const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    const conditions = [eq(campaigns.ngoId, ngo.id)];

    if (query) {
      conditions.push(ilike(campaigns.title, `%${query}%`));
    }

    const data = await db.select().from(campaigns)
      .where(and(...conditions))
      .orderBy(desc(campaigns.createdAt));

    const allCampaigns = await db.select().from(campaigns).where(eq(campaigns.ngoId, ngo.id));
    
    const stats = {
      total: allCampaigns.length,
      active: allCampaigns.filter(c => c.status === 'active').length,
      raised: allCampaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0)
    };

    return { data, stats };

  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return { error: "Failed to fetch campaigns" };
  }
}

// --- Records ---

export async function getRecords(query?: string, category?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    const conditions = [eq(documents.ngoId, ngo.id)];

    if (query) {
      conditions.push(ilike(documents.name, `%${query}%`));
    }
    
    // If category is provided (and not 'All'), we could filter by type if type maps to category
    if (category && category !== 'All') {
         // Assuming 'type' field in documents table maps to category roughly
         conditions.push(eq(documents.type, category));
    }

    const data = await db.select().from(documents)
      .where(and(...conditions))
      .orderBy(desc(documents.createdAt));

    const allDocs = await db.select().from(documents).where(eq(documents.ngoId, ngo.id));
    
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    const verifiedCount = allDocs.filter(d => d.status === 'verified' || d.status === 'Verified').length;
    const expiringCount = allDocs.filter(d => d.expiryDate && new Date(d.expiryDate) <= thirtyDaysFromNow && new Date(d.expiryDate) >= now).length;
    // Assuming 'pending' or 'rejected' counts as missing/action needed for now, or just filtered by 'missing' if added later
    const missingCount = allDocs.filter(d => d.status === 'pending' || d.status === 'missing').length;

    const stats = {
      total: allDocs.length,
      verified: verifiedCount,
      expiring: expiringCount,
      missing: missingCount
    };

    return { data, stats };

  } catch (error) {
    console.error("Error fetching records:", error);
    return { error: "Failed to fetch records" };
  }
}

// --- Collaborations ---

export async function getCollaborations(query?: string, status?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    // We fetch proposals joined with CSR opportunities to represent collaborations
    // A collaboration is essentially an interaction with a CSR partner
    
    const baseQuery = db.select({
        id: proposals.id,
        status: proposals.status,
        createdAt: proposals.createdAt,
        companyName: csrOpportunities.companyName,
        sector: csrOpportunities.sector,
        location: csrOpportunities.location,
        description: csrOpportunities.description,
        opportunityTitle: csrOpportunities.title
    })
    .from(proposals)
    .innerJoin(csrOpportunities, eq(proposals.opportunityId, csrOpportunities.id))
    .where(eq(proposals.ngoId, ngo.id));

    // Execute to filter in JS or use complex SQL conditions
    // Using JS filter for simplicity with flexible query
    const allCollabs = await baseQuery;

    let filtered = allCollabs;

    if (query) {
         const lowerQ = query.toLowerCase();
         filtered = filtered.filter(c => 
             c.companyName.toLowerCase().includes(lowerQ) || 
             c.sector.toLowerCase().includes(lowerQ)
         );
    }

    if (status && status !== 'All Status') {
         filtered = filtered.filter(c => c.status?.toLowerCase() === status.toLowerCase());
    }
    
    // Sort
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const stats = {
        total: allCollabs.length,
        active: allCollabs.filter(c => c.status === 'approved' || c.status === 'active').length, // Assuming 'approved' is used
        pending: allCollabs.filter(c => c.status === 'submitted' || c.status === 'pending').length,
        jointProjs: allCollabs.filter(c => c.status === 'approved').length // Proxy for joint projects
    };

    return { data: filtered, stats };

  } catch (error) {
    console.error("Error fetching collaborations:", error);
    return { error: "Failed to fetch collaborations" };
  }
}

