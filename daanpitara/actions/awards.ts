"use server";

import { db } from "@/lib/db";
import { awards, ngos } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

export async function getAwards() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, parseInt(session.user.id)),
    });

    if (!ngo) return { error: "No NGO profile found" };

    const data = await db.select().from(awards)
      .where(eq(awards.ngoId, ngo.id))
      .orderBy(desc(awards.createdAt));

    return { data };
  } catch (error) {
    console.error("Error fetching awards:", error);
    return { error: "Failed to fetch awards" };
  }
}

export async function createAward(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: "Unauthorized" };
  
    try {
      const ngo = await db.query.ngos.findFirst({
        where: eq(ngos.ownerId, parseInt(session.user.id)),
      });
  
      if (!ngo) return { error: "No NGO profile found" };

      const title = formData.get("title") as string;
      const year = formData.get("year") as string;
      const description = formData.get("description") as string;

      if (!title || !year) {
          return { error: "Title and Year are required" };
      }

      await db.insert(awards).values({
          ngoId: ngo.id,
          title,
          year,
          description,
          createdAt: new Date(),
      });

      revalidatePath("/dashboard/awards");
      return { success: true };

    } catch (error) {
      console.error("Error creating award:", error);
      return { error: "Failed to create award" };
    }
}
