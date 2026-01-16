"use server";

import { db } from "@/lib/db";
import { ngos, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NGO as StaticNGO } from "@/data/ngos";

// Type definition matches data/ngos.ts structure
export type MapNGO = StaticNGO;

export async function getMapNGOs(): Promise<MapNGO[]> {
  try {
    // Fetch NGOs and their owners (for phone/contact info if needed)
    const dbNgos = await db.select({
      ngo: ngos,
      user: users,
    })
    .from(ngos)
    .innerJoin(users, eq(ngos.ownerId, users.id));

    return dbNgos.map(({ ngo, user }) => {
      // 1. Generate Slug
      const slug = ngo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      // 2. Map Category (Take first focus area or default)
      let category: MapNGO['category'] = "Multi-domain";
      if (ngo.focusAreas && ngo.focusAreas.length > 0) {
         // Simple mapping or direct usage if matches
         const focus = ngo.focusAreas[0];
         if (["Education", "Health", "Elderly Care", "Environment"].includes(focus)) {
            category = focus as MapNGO['category'];
         }
      }

      // 3. Address Parsing (Naive approach for now as DB has single string)
      // We might need geocoding later, but for now assuming Lat/Lng is accurate
      
      return {
        id: ngo.id,
        name: ngo.name,
        slug: slug, // Generated
        phone: user.phoneNumber || "N/A", // From User table
        country: "India", // Default
        state: "Unknown", // Would need geocoding or separate field
        city: ngo.headquarters?.split(',')[0] || "Unknown", 
        category: category,
        lat: ngo.lat || 0,
        lng: ngo.lng || 0,
        onboardingDate: ngo.createdAt ? ngo.createdAt.toISOString().split('T')[0] : null,
        paymentClear: ngo.paymentClear || false,
        verified: ngo.verified || false,
      };
    });
  } catch (error) {
    console.error("Error fetching Map NGOs:", error);
    return [];
  }
}
