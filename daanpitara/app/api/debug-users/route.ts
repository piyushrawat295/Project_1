import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const adminRows = await db.select().from(users);
        return NextResponse.json(adminRows);
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
