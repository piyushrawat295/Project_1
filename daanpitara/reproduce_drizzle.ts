
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { eq } from 'drizzle-orm';
// We need to import schema types but not the runtime values if possible, 
// or ensure schema doesn't rely on env (it shouldn't).
// lib/schema.ts exports tables. It should be fine to static import schema as long as it doesn't use env.

async function main() {
  console.log('Starting Drizzle reproduction...');
  
  // Dynamic import db to ensure env is loaded
  const { db } = await import('./lib/db');
  const { ngos } = await import('./lib/schema');

  try {
    const userId = 4;
    console.log(`Querying for ownerId: ${userId}`);
    
    // Attempting to reproduce the exact query failure
    const ngo = await db.query.ngos.findFirst({
      where: eq(ngos.ownerId, userId),
    });
    
    console.log('Query successful:', ngo);
  } catch (error) {
    console.error('Query failed!');
    console.error(error);
  }
}

main();
