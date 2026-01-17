"use server";

import { db } from "@/lib/db";
import { beneficiaries, projects, teamMembers, ngos, events, campaigns, documents, proposals, csrOpportunities, volunteers, boardMembers, partners, donations } from "@/lib/schema";
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

export async function createBeneficiary(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
     const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(beneficiaries).values({
      ngoId: ngo.id,
      name: data.name,
      age: parseInt(data.age) || 0,
      gender: data.gender,
      category: data.category,
      projectId: data.projectId ? parseInt(data.projectId) : null,
      location: data.location,
      phone: data.phone,
      // notes: data.notes, // Schema update pending for notes? Added in schema.ts.
    });

    revalidatePath("/dashboard/beneficiaries");
    return { success: true };
  } catch (error) {
    console.error("Create beneficiary error:", error);
    return { error: "Failed to create beneficiary" };
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

    const conditions = [eq(volunteers.ngoId, ngo.id)];

    if (query) {
       const search = or(
           ilike(volunteers.name, `%${query}%`),
           ilike(volunteers.skills, `%${query}%`)
       );
       if (search) conditions.push(search);
    }

    if (status && status !== "All" && status !== "All Status") {
        conditions.push(eq(volunteers.status, status));
    }

    const data = await db.select().from(volunteers)
      .where(and(...conditions))
      .orderBy(desc(volunteers.createdAt));
    
    // Stats from actual data
    const allVolunteers = await db.select().from(volunteers).where(eq(volunteers.ngoId, ngo.id));
    
    // Calculate hours (mock logic if field missing, or just 0)
    // We don't have hours in schema yet, assumed per user requirement to just have basic registration
    
    const stats = {
        total: allVolunteers.length,
        active: allVolunteers.filter(v => v.status === 'Active').length,
        pending: allVolunteers.filter(v => v.status === 'Pending').length,
        totalHours: 0 
    };

    return { data, stats };

  } catch (error) {
      console.error("Error fetching volunteers:", error);
      return { error: "Failed to fetch volunteers" };
  }
}

export async function createVolunteer(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
     const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(volunteers).values({
      ngoId: ngo.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      skills: data.skills,
      availability: data.availability,
      status: 'Pending', // Default to pending
    });

    revalidatePath("/dashboard/volunteers");
    return { success: true };
  } catch (error) {
    console.error("Create volunteer error:", error);
    return { error: "Failed to create volunteer" };
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

    const conditions = [eq(partners.ngoId, ngo.id)];

    if (query) {
        const searchCondition = or(
            ilike(partners.organizationName, `%${query}%`),
            ilike(partners.contactPerson, `%${query}%`)
        );
        if (searchCondition) {
            conditions.push(searchCondition);
        }
    }

    if (status && status !== 'All' && status !== 'All Status') {
         conditions.push(ilike(partners.status, status));
    }
    
    // Sort
    const data = await db.select().from(partners)
        .where(and(...conditions))
        .orderBy(desc(partners.createdAt));

    // Stats
    const allPartners = await db.select().from(partners).where(eq(partners.ngoId, ngo.id));

    const stats = {
        total: allPartners.length,
        active: allPartners.filter(p => p.status?.toLowerCase() === 'active').length,
        pending: allPartners.filter(p => p.status?.toLowerCase() === 'pending').length,
        jointProjs: allPartners.filter(p => p.type === 'Corporate').length // Proxy stat if no real link
    };

    return { data, stats };

  } catch (error) {
    console.error("Error fetching collaborations:", error);
    return { error: "Failed to fetch collaborations" };
  }
}



export async function createTeamMember(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
     const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(teamMembers).values({
      ngoId: ngo.id,
      name: data.name,
      role: data.role,
      email: data.email,
      phone: data.phone,
    });

    revalidatePath("/dashboard/ngo-profile");
    return { success: true };
  } catch (error) {
    console.error("Create team member error:", error);
    return { error: "Failed to create team member" };
  }
}

export async function createBoardMember(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
     const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(boardMembers).values({
      ngoId: ngo.id,
      name: data.name,
      role: data.role, // Designation
      email: data.email,
      phone: data.phone,
    });

    revalidatePath("/dashboard/ngo-profile");
    return { success: true };
  } catch (error) {
    console.error("Create board member error:", error);
    return { error: "Failed to create board member" };
  }
}

export async function createProject(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(projects).values({
      ngoId: ngo.id,
      title: data.title,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      sector: data.sector, // Theme
      location: data.location,
      beneficiariesTargeted: data.targetBeneficiaries ? parseInt(data.targetBeneficiaries) : 0,
      totalBudget: data.budget ? parseFloat(data.budget) : 0,
      status: data.fundingStatus === 'Seeking funds' ? 'seeking_funding' : 'active', // Mapping status
    });

    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error) {
    console.error("Create project error:", error);
    return { error: "Failed to create project" };
  }
}

export async function createEvent(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(events).values({
      ngoId: ngo.id,
      title: data.name,
      date: new Date(data.date),
      location: data.location,
      beneficiariesCount: data.expectedBeneficiaries ? parseInt(data.expectedBeneficiaries) : 0,
      description: data.description,
      status: 'upcoming' 
    });


    revalidatePath("/dashboard/events");
    return { success: true };
  } catch (error) {
    console.error("Create event error:", error);
    return { error: "Failed to create event" };
  }
}

export async function createPartner(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(partners).values({
      ngoId: ngo.id,
      organizationName: data.organizationName,
      type: data.type,
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      location: data.location,
      description: data.description,
      status: 'active'
    });

    revalidatePath("/dashboard/collaboration");
    return { success: true };
  } catch (error) {
    console.error("Create partner error:", error);
    return { error: "Failed to create partner" };
  }
}

export async function createDonation(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(donations).values({
      ngoId: ngo.id,
      donorName: data.donorName,
      amount: parseFloat(data.amount),
      date: new Date(data.date),
      projectId: data.projectId ? parseInt(data.projectId) : null,
      type: 'Offline', // Defaulting to Offline for manual entry
      status: 'received'
    });

    revalidatePath("/dashboard/funding");
    return { success: true };
  } catch (error) {
    console.error("Create donation error:", error);
    return { error: "Failed to create donation" };
  }
}

export async function createRecord(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(documents).values({
      ngoId: ngo.id,
      name: data.title,
      type: data.type, // 'record' or file extension could go here, treating as type for now
      category: data.category,
      description: data.description,
      url: data.url || '#', // Placeholder if no actual file upload yet
      status: 'pending'
    });

    revalidatePath("/dashboard/records");
    return { success: true };
  } catch (error) {
    console.error("Create record error:", error);
    return { error: "Failed to create record" };
  }
}

export async function createDocument(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    await db.insert(documents).values({
      ngoId: ngo.id,
      name: data.name, // e.g., "Registration Certificate"
      type: 'compliance_doc',
      category: 'compliance',
      url: data.url || '#',
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      status: 'verified' // Assuming self-uploaded docs are verified or pending admin review
    });

    revalidatePath("/dashboard/documents");
    return { success: true };
  } catch (error) {
    console.error("Create document error:", error);
    return { error: "Failed to create document" };
  }
}

// --- Delete Actions ---

export async function deleteBeneficiary(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };
  try {
     await db.delete(beneficiaries).where(eq(beneficiaries.id, id));
     revalidatePath("/dashboard/beneficiaries");
     return { success: true };
  } catch (err) {
      return { error: "Failed to delete beneficiary" };
  }
}

export async function deleteProject(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };
  try {
     // NOTE: dependent records (beneficiaries, donations) might fail if no cascade delete.
     // For now assuming cascade or soft delete not required strictly.
     await db.delete(projects).where(eq(projects.id, id));
     revalidatePath("/dashboard/projects");
     return { success: true };
  } catch (err) {
      console.error(err);
      return { error: "Failed to delete project (may have linked data)" };
  }
}

export async function deleteVolunteer(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };
  try {
     await db.delete(volunteers).where(eq(volunteers.id, id));
     revalidatePath("/dashboard/volunteers");
     return { success: true };
  } catch (err) {
      return { error: "Failed to delete volunteer" };
  }
}

export async function deletePartner(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };
  try {
     await db.delete(partners).where(eq(partners.id, id));
     revalidatePath("/dashboard/collaboration");
     return { success: true };
  } catch (err) {
      return { error: "Failed to delete partner" };
  }
}

export async function deleteEvent(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };
  try {
     await db.delete(events).where(eq(events.id, id));
     revalidatePath("/dashboard/events"); // Assuming this is the path
     revalidatePath("/dashboard/digital-presence"); // or here
     return { success: true };
  } catch (err) {
      return { error: "Failed to delete event" };
  }
}

export async function deleteRecord(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };
  try {
     await db.delete(documents).where(eq(documents.id, id));
     revalidatePath("/dashboard/records");
     return { success: true };
  } catch (err) {
      return { error: "Failed to delete record" };
  }
}

export async function deleteDocument(id: number) {
    return deleteRecord(id); // Alias
}

export async function deleteCampaign(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };
  try {
     await db.delete(campaigns).where(eq(campaigns.id, id));
     revalidatePath("/dashboard/funding");
     return { success: true };
  } catch (err) {
      return { error: "Failed to delete campaign" };
  }
}

export async function deleteTeamMember(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };
  try {
     await db.delete(teamMembers).where(eq(teamMembers.id, id));
     revalidatePath("/dashboard/ngo-profile");
     return { success: true };
  } catch (err) {
      return { error: "Failed to delete team member" };
  }
}

export async function deleteBoardMember(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };
  try {
     await db.delete(boardMembers).where(eq(boardMembers.id, id));
     revalidatePath("/dashboard/ngo-profile");
     return { success: true };
  } catch (err) {
      return { error: "Failed to delete board member" };
  }
}

