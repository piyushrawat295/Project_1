const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function checkSchema() {
  try {
    await client.connect();
    console.log('Connected to database');

    const res = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'ngos';
    `);

    console.log('NGOS Table Schema:');
    res.rows.forEach(row => {
      console.log(`${row.column_name}: ${row.data_type}`);
    });

    const userCount = await client.query(`SELECT count(*) FROM users`);
    console.log('User count:', userCount.rows[0].count);

    // Try a raw query similar to the failing one
    // params: 4, 1
    try {
        const testQuery = 'select "id", "owner_id" from "ngos" where "ngos"."owner_id" = $1 limit $2';
        const testRes = await client.query(testQuery, [4, 1]);
        console.log('Test query success:', testRes.rows);
    } catch (qErr) {
        console.error('Test query failed:', qErr.message);
    }

    await client.end();
  } catch (err) {
    console.error('Error:', err);
  }
}

checkSchema();
