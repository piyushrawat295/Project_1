"use server";

import { db } from "@/lib/db";
import { ngos, users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export type MapNGO = {
  id: number;
  name: string;
  slug: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  category: "Education" | "Health" | "Elderly Care" | "Environment" | "Multi-domain";
  lat: number;
  lng: number;
  onboardingDate: string | null;
  paymentClear: boolean;
  verified: boolean;
};

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

      // 3. Address Parsing
      // Use operational state/district as proxy for location if available
      const state = (ngo.operationalStates && ngo.operationalStates.length > 0) 
        ? ngo.operationalStates[0] 
        : "Unknown";

      const city = (ngo.operationalDistricts && ngo.operationalDistricts.length > 0)
        ? ngo.operationalDistricts[0]
        : (ngo.headquarters?.split(',')[0] || "Unknown");
      
      return {
        id: ngo.id,
        name: ngo.name,
        slug: slug, // Generated
        phone: user.phoneNumber || "N/A", // From User table
        country: "India", // Default
        state: state,
        city: city,
        category: category,
        lat: ngo.lat || 0,
        lng: ngo.lng || 0,
        onboardingDate: ngo.createdAt ? ngo.createdAt.toISOString().split('T')[0] : null,
        paymentClear: ngo.paymentClear || false,
        verified: ngo.verified || false,
      };
    }).filter(ngo => ngo.lat !== 0 && ngo.lng !== 0);
  } catch (error) {
    console.error("Error fetching Map NGOs:", error);
    return [];
  }
}
