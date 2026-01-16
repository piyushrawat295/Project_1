"use server";

import { db } from "@/lib/db";
import { users, ngos, documents, activityLogs, messages, campaigns, projects, events, beneficiaries } from "@/lib/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

// --- User Profile Actions ---

export async function updateUserProfile(data: {
  phone?: string;
  location?: string;
  bio?: string;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await db.update(users)
      .set({
        phoneNumber: data.phone,
        location: data.location,
        bio: data.bio,
        updatedAt: new Date(),
      })
      .where(eq(users.email, session.user.email));
    
    revalidatePath("/dashboard/profile");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Failed to update profile" };
  }
}

// --- NGO Details Actions ---

export async function saveNGODetails(data: {
  name: string;
  registrationNumber?: string;
  foundedYear?: string;
  establishedYear?: number;
  type?: string;          // New
  panNumber?: string;     // New
  teamSize?: string;
  headquarters?: string;
  description?: string;
  focusAreas?: string[];
  operationalStates?: string[]; // New
  operationalDistricts?: string[]; // New
  vision?: string;        // New
  mission?: string;       // New
  objectives?: string;    // New
  lat?: number;
  lng?: number;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }
  
  try {
    const userId = parseInt(session.user.id);
    
    // Check if NGO exists for this user
    const existingNGO = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, userId),
    });

    const commonData = {
      name: data.name,
      registrationNumber: data.registrationNumber,
      foundedYear: data.foundedYear, // Legacy
      establishedYear: data.foundedYear ? parseInt(data.foundedYear) : undefined, // Parse
      type: data.type,
      panNumber: data.panNumber,
      teamSize: data.teamSize,
      headquarters: data.headquarters,
      description: data.description,
      focusAreas: data.focusAreas,
      operationalStates: data.operationalStates,
      operationalDistricts: data.operationalDistricts,
      vision: data.vision,
      mission: data.mission,
      objectives: data.objectives,
      lat: data.lat,
      lng: data.lng,
      updatedAt: new Date(),
    };

    if (existingNGO) {
      // Update
      await db.update(ngos)
        .set(commonData)
        .where(eq(ngos.id, existingNGO.id));
    } else {
      // Create
      await db.insert(ngos).values({
        ownerId: userId,
        verified: false,
        paymentClear: false,
        ...commonData,
      });
    }

    revalidatePath("/dashboard/ngo-profile");
    return { success: true, message: "NGO details saved successfully" };
  } catch (error) {
    console.error("Error saving NGO details:", error);
    return { success: false, message: "Failed to save NGO details" };
  }
}



export async function getNGOProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  try {
     const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });
    return ngo;
  } catch (error) {
    console.error("Error fetching NGO profile:", error);
    return null;
  }
}

export async function getDashboardData() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  try {
    const userId = parseInt(session.user.id);
    
    // Fetch NGO
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, userId),
    });

    if (!ngo) return {
      error: "No NGO profile found"
    };

    // Calculate Profile Completion
    let completionScore = 0;
    
    // 1. Basic Info: Name is mandatory, so if we have a session user, this is effectively true.
    const hasBasicInfo = !!(session.user.name);

    // 2. Contact Info: Require Email AND (Phone OR Location)
    // We need to fetch the user details to check phone/location since they might not be in the session object
    const userDetails = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        phoneNumber: true,
        location: true,
      }
    });
    const hasContactInfo = !!(session.user.email && (userDetails?.phoneNumber || userDetails?.location));

    // 3. NGO Details: Require more fields for a "complete" profile
    const hasNgoDetails = !!(
      ngo.name && 
      ngo.description && 
      ngo.headquarters && 
      ngo.foundedYear &&
      ngo.registrationNumber &&
      ngo.teamSize &&
      (ngo.focusAreas && ngo.focusAreas.length > 0)
    );

    const steps = {
      basicInfo: hasBasicInfo,
      contactInfo: hasContactInfo, 
      ngoDetails: hasNgoDetails,
      documents: false,
      verification: ngo.verified || false
    };

    if (steps.basicInfo) completionScore += 20;
    if (steps.contactInfo) completionScore += 20;
    if (steps.ngoDetails) completionScore += 20;

    // Fetch Documents
    const docs = await db.select().from(documents).where(eq(documents.ngoId, ngo.id));
    
    const docStats = {
      total: docs.length,
      verified: docs.filter(d => d.status === 'verified').length,
      pending: docs.filter(d => d.status === 'pending').length,
      missing: docs.filter(d => d.status === 'missing').length
    };

    if (docStats.total > 0) {
      steps.documents = true;
      completionScore += 20;
    }

    if (steps.verification) completionScore += 20;

    // Fetch Recent Activity
    const activities = await db.select().from(activityLogs)
      .where(eq(activityLogs.ngoId, ngo.id))
      .orderBy(desc(activityLogs.createdAt))
      .limit(5);

    // Fetch Messages
    const msgs = await db.select().from(messages)
      .where(eq(messages.receiverId, userId))
      .orderBy(desc(messages.createdAt))
      .limit(3);
    
    // Count unread messages
    const unreadResult = await db.select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(sql`${messages.receiverId} = ${userId} AND ${messages.isRead} = false`);
    const unreadCount = unreadResult[0]?.count || 0;

    // Quick Insights (Mocked logic for growth/engagement as we don't have analytics table yet)
    const insights = {
      engagement: 1200 + (docStats.verified * 50),
      profileViews: 450 + (docStats.total * 10),
      campaigns: await db.select({ count: sql<number>`count(*)` }).from(campaigns).where(eq(campaigns.ngoId, ngo.id)).then(res => res[0].count),
      growth: 15
    };

    // Fetch Projects
    const projectList = await db.select().from(projects)
      .where(eq(projects.ngoId, ngo.id))
      .orderBy(desc(projects.createdAt))
      .limit(5);

    // Fetch Events (Upcoming)
    const eventList = await db.select().from(events)
      .where(eq(events.ngoId, ngo.id))
      .orderBy(asc(events.date))
      .limit(3);

    // Count Beneficiaries
    const benResult = await db.select({ count: sql<number>`count(*)` })
      .from(beneficiaries)
      .where(eq(beneficiaries.ngoId, ngo.id));
    const totalBeneficiaries = benResult[0]?.count || 0;

    // Calculate Funds (Sum from projects)
    const fundsResult = await db.select({ total: sql<number>`sum(${projects.raisedAmount})` })
      .from(projects)
      .where(eq(projects.ngoId, ngo.id));
    const fundsUtilized = fundsResult[0]?.total || 0;

    const stats = {
      healthScore: 85, // Mocked score
      totalBeneficiaries,
      activeProjects: projectList.filter(p => p.status === 'active').length,
      fundsUtilized
    };

    return {
      ngo,
      userName: session.user.name || "Admin",
      completion: {
        score: completionScore,
        steps
      },
      docStats,
      activities,
      messages: msgs,
      unreadCount,
      insights,
      projects: projectList,
      events: eventList,
      stats
    };

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { error: "Failed to fetch dashboard data. Please try again later." };
  }
}
