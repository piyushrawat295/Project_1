"use server";

import { db } from "@/lib/db";
import { users, ngos, projects, documents, activityLogs, teamMembers, boardMembers } from "@/lib/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

export async function getAdminDashboardData() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        // Basic Counts
        const ngosCountRes = await db.select({ count: sql<number>`count(*)` }).from(ngos);
        const totalNGOs = ngosCountRes[0]?.count || 0;

        const usersCountRes = await db.select({ count: sql<number>`count(*)` }).from(users);
        const totalUsers = usersCountRes[0]?.count || 0;

        const projectsRes = await db.select().from(projects);
        const activeProjects = projectsRes.filter(p => p.status === 'active').length;

        const fundsRes = await db.select({ total: sql<number>`sum(${projects.raisedAmount})` }).from(projects);
        const totalFundsRaw = fundsRes[0]?.total || 0;
        // Format totalFunds (e.g. ₹52.4Cr)
        let totalFundsFormatted = `₹${totalFundsRaw}`;
        if (totalFundsRaw >= 10000000) {
            totalFundsFormatted = `₹${(totalFundsRaw / 10000000).toFixed(1)}Cr`;
        } else if (totalFundsRaw >= 100000) {
            totalFundsFormatted = `₹${(totalFundsRaw / 100000).toFixed(1)}L`;
        } else {
            totalFundsFormatted = `₹${totalFundsRaw.toLocaleString('en-IN')}`;
        }

        const stats = [
            { id: "ngos", label: "Total NGOs", value: totalNGOs.toString(), sub: "Registered platform-wide", change: "...", color: "bg-blue-500" },
            { id: "users", label: "Total Users", value: totalUsers.toString(), sub: "Across platform", change: "...", color: "bg-teal-500" },
            { id: "projects", label: "Active Projects", value: activeProjects.toString(), sub: "Currently running", change: "...", color: "bg-orange-500" },
            { id: "funds", label: "Total Funds Raised", value: totalFundsFormatted, sub: "Lifetime", change: "...", color: "bg-purple-500" },
        ];

        // Pending Actions (e.g., Unverified NGOs, Pending Documents)
        const pendingNgos = await db.select().from(ngos).where(eq(ngos.verified, false)).limit(3);
        const pendingDocs = await db.select().from(documents).where(eq(documents.status, 'pending')).limit(3);

        const pendingActions = [
            ...pendingNgos.map(n => ({
                id: `ngo-${n.id}`,
                priority: "high",
                type: "NGO Verification",
                title: n.name,
                desc: "New NGO registration pending verification",
                time: n.createdAt.toLocaleDateString(),
                action: "Verify Now",
                link: `/dashboard/admin/ngo-management/${n.id}`
            })),
            ...pendingDocs.map(d => ({
                id: `doc-${d.id}`,
                priority: "medium",
                type: "Document Review",
                title: d.name,
                desc: `Document from NGO ID ${d.ngoId}`,
                time: d.createdAt.toLocaleDateString(),
                action: "Review",
                link: `/dashboard/admin/document-approval/${d.id}`
            }))
        ];

        // Recent Activities (latest logs or creations)
        const activities = await db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(5);
        const formattedActivities = activities.map(a => ({
            id: a.id,
            name: `NGO ID: ${a.ngoId}`, // In real app, join with NGO table
            event: a.action,
            time: a.createdAt.toLocaleDateString(),
            color: "bg-blue-500"
        }));

        // Top NGOs (mock scoring for now based on details + verification)
        const nList = await db.select().from(ngos).where(eq(ngos.verified, true)).limit(5);
        const topNGOs = nList.map((n, idx) => ({
            id: n.id,
            initials: n.name.substring(0, 2).toUpperCase(),
            name: n.name,
            sub: n.verified ? "Verified NGO" : "Unverified",
            score: Math.floor(Math.random() * 20) + 80, // Fake score
            projects: 0,
            beneficiaries: "0",
            funds: "₹0",
            rating: 4.5 + (Math.random() * 0.5),
            color: ["bg-[#1572A1]", "bg-green-600", "bg-teal-600", "bg-amber-600"][idx % 4]
        }));

        const summaryCards = [
            { icon: "✓", label: "Verified NGOs", value: nList.length.toString(), sub: "Registered", color: "from-green-500 to-emerald-600" },
            { icon: "⏱", label: "Pending Verifications", value: pendingNgos.length.toString(), sub: "Requires attention", color: "from-amber-500 to-yellow-600" },
            { icon: "!", label: "Flagged Issues", value: "0", sub: "None at the moment", color: "from-red-500 to-rose-600" },
        ];

        return {
            stats,
            pendingActions,
            recentActivities: formattedActivities,
            topNGOs,
            summaryCards
        };

    } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        return { error: "Failed to fetch admin data." };
    }
}

export async function verifyNGO(ngoId: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user as any).role !== 'admin') {
        return { error: "Unauthorized" };
    }

    try {
        await db.update(ngos).set({ verified: true, updatedAt: new Date() }).where(eq(ngos.id, ngoId));
        revalidatePath('/dashboard/admin');
        revalidatePath('/dashboard/admin/ngo-management');
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Failed to verify NGO" };
    }
}

export async function getAdminDocuments() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user as any).role !== 'admin') {
        return { error: "Unauthorized" };
    }

    try {
        const docs = await db.select({
            id: documents.id,
            name: documents.name,
            type: documents.type,
            category: documents.category,
            url: documents.url,
            status: documents.status,
            expiryDate: documents.expiryDate,
            createdAt: documents.createdAt,
            ngoName: ngos.name,
            ngoId: ngos.id
        })
            .from(documents)
            .leftJoin(ngos, eq(documents.ngoId, ngos.id))
            .orderBy(desc(documents.createdAt));

        return { data: docs };
    } catch (error) {
        console.error("Error fetching admin documents:", error);
        return { error: "Failed to fetch documents." };
    }
}

import { notifications } from '@/lib/schema';

export async function updateDocumentStatus(docId: number, status: string, rejectionReason?: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user as any).role !== 'admin') {
        return { error: "Unauthorized" };
    }

    try {
        // Here you would also add rejectionReason to schema if needed, for now we just change status
        // and optionally create an activity log for the rejection reason.
        await db.update(documents).set({ status, updatedAt: new Date() }).where(eq(documents.id, docId));

        const doc = await db.select({
            id: documents.id,
            name: documents.name,
            ngoId: documents.ngoId,
            ownerId: ngos.ownerId
        }).from(documents)
            .leftJoin(ngos, eq(documents.ngoId, ngos.id))
            .where(eq(documents.id, docId))
            .limit(1);

        if (doc[0]) {
            const message = `Your document '${doc[0].name}' was ${status}.${rejectionReason ? ` Reason: ${rejectionReason}` : ''}`;
            await db.insert(activityLogs).values({
                ngoId: doc[0].ngoId,
                action: `Document ${status}`,
                details: message
            });

            // Log notification to DB for polling
            if (doc[0].ownerId) {
                await db.insert(notifications).values({
                    userId: doc[0].ownerId,
                    title: `Document ${status.toUpperCase()}`,
                    message: message,
                });
            }
        }

        revalidatePath('/dashboard/admin/document-approval');
        return { success: true };
    } catch (error) {
        console.error("Error updating document status:", error);
        return { error: "Failed to update document status." };
    }
}

export async function getAdminNGOs() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user as any).role !== 'admin') {
        return { error: "Unauthorized" };
    }

    try {
        const ngoList = await db.select().from(ngos).orderBy(desc(ngos.createdAt));

        // We could write a complex JOIN but a map is safer and fast enough for <1000 items usually
        const data = await Promise.all(ngoList.map(async (n, idx) => {
            const projectsRes = await db.select().from(projects).where(eq(projects.ngoId, n.id));
            const totalFunds = projectsRes.reduce((sum, p) => sum + (p.raisedAmount || 0), 0);

            // Format totalFunds
            let totalFundsFormatted = `₹${totalFunds}`;
            if (totalFunds >= 10000000) {
                totalFundsFormatted = `₹${(totalFunds / 10000000).toFixed(1)}Cr`;
            } else if (totalFunds >= 100000) {
                totalFundsFormatted = `₹${(totalFunds / 100000).toFixed(1)}L`;
            } else {
                totalFundsFormatted = `₹${totalFunds.toLocaleString('en-IN')}`;
            }

            const owner = await db.select({ email: users.email, phone: users.phoneNumber }).from(users).where(eq(users.id, n.ownerId)).limit(1);

            return {
                id: n.id,
                initials: n.name.substring(0, 2).toUpperCase(),
                name: n.name,
                reg: n.registrationNumber || "N/A",
                email: owner[0]?.email || "N/A",
                phone: owner[0]?.phone || "N/A",
                location: n.headquarters || "Unknown",
                status: n.verified ? "Verified" : "Pending",
                score: n.verified ? Math.floor(Math.random() * 20) + 80 : null, // mock score,
                projects: projectsRes.length,
                beneficiaries: "0", // Could do beneficiaries lookup
                funds: totalFundsFormatted,
                lastActive: new Date(n.updatedAt).toLocaleDateString(),
                color: ["bg-[#1572A1]", "bg-green-600", "bg-teal-600", "bg-amber-600"][idx % 4]
            };
        }));

        return { data };
    } catch (error) {
        console.error("Error fetching NGOs:", error);
        return { error: "Failed to fetch NGOs" };
    }
}

export async function deleteNGO(ngoId: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user as any).role !== 'admin') {
        return { error: "Unauthorized" };
    }

    try {
        // Technically need to cascade delete but depends on DB constraints. We will just delete the NGO.
        await db.delete(ngos).where(eq(ngos.id, ngoId));
        revalidatePath('/dashboard/admin/ngo-management');
        return { success: true };
    } catch (err) {
        console.error(err);
        return { error: "Failed to delete NGO. Make sure all children records are deleted first or cascade is enabled." };
    }
}

export async function getAdminNGOById(ngoId: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user as any).role !== 'admin') {
        return { error: "Unauthorized" };
    }

    try {
        const ngoList = await db.select().from(ngos).where(eq(ngos.id, ngoId)).limit(1);
        if (ngoList.length === 0) return { error: "NGO not found" };

        const n = ngoList[0];
        const owner = await db.select({ email: users.email, phone: users.phoneNumber }).from(users).where(eq(users.id, n.ownerId)).limit(1);
        const team = await db.select().from(teamMembers).where(eq(teamMembers.ngoId, ngoId));
        const board = await db.select().from(boardMembers).where(eq(boardMembers.ngoId, ngoId));

        return {
            id: n.id,
            name: n.name,
            type: n.type || "Trust",
            panNumber: n.panNumber || "",
            registrationNumber: n.registrationNumber || "",
            foundedYear: n.foundedYear || "",
            teamSize: n.teamSize || "",
            headquarters: n.headquarters || "",
            description: n.description || "",
            focusAreas: (n.focusAreas as string[]) || [],
            operationalStates: (n.operationalStates as string[]) || [],
            operationalDistricts: (n.operationalDistricts as string[]) || [],
            vision: n.vision || "",
            mission: n.mission || "",
            objectives: n.objectives || "",
            lat: n.lat || 0,
            lng: n.lng || 0,
            teamMembers: team || [],
            boardMembers: board || [],
            status: n.verified ? "Verified" : "Pending",
            email: owner[0]?.email || "N/A",
            phone: owner[0]?.phone || "N/A",
        };
    } catch (error) {
        console.error("Error fetching NGO by ID:", error);
        return { error: "Failed to fetch NGO details" };
    }
}

export async function updateAdminNGODetails(ngoId: number, data: any) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user as any).role !== 'admin') {
        return { error: "Unauthorized" };
    }

    try {
        await db.update(ngos).set({
            name: data.name,
            registrationNumber: data.registrationNumber,
            panNumber: data.panNumber,
            headquarters: data.headquarters,
            updatedAt: new Date(),
        }).where(eq(ngos.id, ngoId));

        if (data.status) {
            await db.update(ngos).set({
                verified: data.status === "Verified",
                updatedAt: new Date(),
            }).where(eq(ngos.id, ngoId));
        }

        revalidatePath(`/dashboard/admin/ngo-management/${ngoId}`);
        revalidatePath(`/dashboard/admin/ngo-management/${ngoId}/edit`);
        revalidatePath(`/dashboard/admin/ngo-management`);
        return { success: true };
    } catch (error) {
        console.error("Error updating NGO specifics:", error);
        return { error: "Failed to update NGO details." };
    }
}
