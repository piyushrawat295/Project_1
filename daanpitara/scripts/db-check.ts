import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { db } from "../lib/db";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Checking tables...");
    try {
        const res = await db.execute(sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log("Tables in public schema:");
        console.log(JSON.stringify(res.rows.map((r: any) => r.table_name), null, 2));
    } catch (e) {
        console.error("Error checking tables:", e);
    }
    process.exit(0);
}
main();
