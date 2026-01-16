"use server";

import { db } from "@/lib/db";
import { users, ngos } from "@/lib/schema";
import { eq } from "drizzle-orm";
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
  teamSize?: string;
  headquarters?: string;
  description?: string;
  focusAreas?: string[];
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

    if (existingNGO) {
      // Update
      await db.update(ngos)
        .set({
          name: data.name,
          registrationNumber: data.registrationNumber,
          foundedYear: data.foundedYear,
          teamSize: data.teamSize,
          headquarters: data.headquarters,
          description: data.description,
          focusAreas: data.focusAreas,
          lat: data.lat,
          lng: data.lng,
          updatedAt: new Date(),
        })
        .where(eq(ngos.id, existingNGO.id));
    } else {
      // Create
      await db.insert(ngos).values({
        ownerId: userId,
        name: data.name,
        registrationNumber: data.registrationNumber,
        foundedYear: data.foundedYear,
        teamSize: data.teamSize,
        headquarters: data.headquarters,
        description: data.description,
        focusAreas: data.focusAreas,
        lat: data.lat,
        lng: data.lng,
        verified: false,
        paymentClear: false,
      });
    }

    revalidatePath("/dashboard/ngo");
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
