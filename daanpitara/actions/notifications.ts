"use server";

import { db } from "@/lib/db";
import { notifications } from "@/lib/schema";
import { eq, desc, and, isNull, or } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { data: [] };

    const userId = parseInt(session.user.id);
    const userRole = (session.user as any).role;

    try {
        const conditions = [];
        if (userRole === "admin") {
            conditions.push(or(eq(notifications.userId, userId), eq(notifications.role, "admin")));
        } else {
            conditions.push(eq(notifications.userId, userId));
        }

        const data = await db.select()
            .from(notifications)
            .where(and(...conditions))
            .orderBy(desc(notifications.createdAt))
            .limit(10); // get last 10 

        return { data };
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return { data: [] };
    }
}

export async function markNotificationsAsRead() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { success: false };

    const userId = parseInt(session.user.id);
    const userRole = (session.user as any).role;

    try {
        const conditions = [];
        if (userRole === "admin") {
            conditions.push(or(eq(notifications.userId, userId), eq(notifications.role, "admin")));
        } else {
            conditions.push(eq(notifications.userId, userId));
        }

        await db.update(notifications)
            .set({ isRead: true })
            .where(and(and(...conditions), eq(notifications.isRead, false)));

        revalidatePath('/'); // Force revalidate across paths conceptually
        return { success: true };
    } catch (error) {
        console.error("Error marking as read:", error);
        return { success: false };
    }
}
