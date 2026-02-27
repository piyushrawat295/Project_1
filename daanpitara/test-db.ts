import { db } from './lib/db';
import { documents, ngos, notifications } from './lib/schema';
import { desc } from 'drizzle-orm';

async function test() {
    const docs = await db.select().from(documents).orderBy(desc(documents.createdAt)).limit(5);
    console.log("Recent Docs:", docs);

    const notifs = await db.select().from(notifications).orderBy(desc(notifications.createdAt)).limit(5);
    console.log("Recent Notifs:", notifs);

    const ngoList = await db.select().from(ngos).orderBy(desc(ngos.createdAt)).limit(5);
    console.log("Recent NGOs:", ngoList);
}

test().catch(console.error);
