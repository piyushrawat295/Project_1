import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const existingAdmin = await db.select().from(users).where(eq(users.email, 'admin@daanpitara.com')).limit(1);

        if (existingAdmin.length === 0) {
            await db.insert(users).values({
                name: 'Super Admin',
                email: 'admin@daanpitara.com',
                password: hashedPassword,
                role: 'admin',
            });
            return NextResponse.json({ success: true, message: 'Created admin', hash: hashedPassword });
        } else {
            await db.update(users).set({ password: hashedPassword, role: 'admin' }).where(eq(users.email, 'admin@daanpitara.com'));
            return NextResponse.json({ success: true, message: 'Updated admin password', hash: hashedPassword });
        }
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
