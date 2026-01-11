const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function createAdmin() {
  try {
    await client.connect();
    console.log('Connected to database');

    const email = 'admin@daanpitara.com';
    const password = 'adminpassword123';
    const name = 'Admin User';
    const role = 'admin';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if admin exists
    const checkRes = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkRes.rows.length > 0) {
      console.log(`Admin user with email ${email} already exists.`);
      
      // Optional: Update to admin role if not already
      if (checkRes.rows[0].role !== 'admin') {
          console.log('User exists but is not admin. Updating role...');
          await client.query("UPDATE users SET role = 'admin' WHERE email = $1", [email]);
          console.log('Role updated to admin.');
      }
    } else {
      // Insert new admin
      // Note: 'role' column is an enum, so we pass it as string, standard PG handles it if it matches enum value
      const insertQuery = `
        INSERT INTO users (name, email, password, role, provider)
        VALUES ($1, $2, $3, $4, 'credentials')
        RETURNING id;
      `;
      const res = await client.query(insertQuery, [name, email, hashedPassword, role]);
      console.log('Admin user created successfully with ID:', res.rows[0].id);
    }
    
    console.log('==============================================');
    console.log('Admin Credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Secret Key:', process.env.ADMIN_SECRET_KEY || 'Check .env.local');
    console.log('==============================================');

  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    await client.end();
  }
}

createAdmin();
