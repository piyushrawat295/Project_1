const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function seedDummyData() {
  try {
    await client.connect();
    console.log('Connected to database');

    // 1. Create/Get User
    const email = 'dummy@daanpitara.com';
    const password = 'password123';
    let userId;

    const userRes = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userRes.rows.length > 0) {
      userId = userRes.rows[0].id;
      console.log(`User ${email} already exists (ID: ${userId})`);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUser = `
        INSERT INTO users (name, email, password, role, provider, image)
        VALUES ($1, $2, $3, $4, 'credentials', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')
        RETURNING id
      `;
      const res = await client.query(insertUser, ['Dummy NGO User', email, hashedPassword, 'ngo']);
      userId = res.rows[0].id;
      console.log(`Created user ${email} (ID: ${userId})`);
    }

    // 2. Create/Get NGO
    let ngoId;
    const ngoRes = await client.query('SELECT id FROM ngos WHERE owner_id = $1', [userId]);
    if (ngoRes.rows.length > 0) {
      ngoId = ngoRes.rows[0].id;
      console.log(`NGO for user already exists (ID: ${ngoId})`);
    } else {
      const insertNGO = `
        INSERT INTO ngos (
          owner_id, name, registration_number, established_year, team_size, 
          headquarters, description, focus_areas, operational_states, 
          vision, mission, type, payment_clear, verified, lat, lng
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true, true, $13, $14)
        RETURNING id
      `;
      const ngoValues = [
        userId,
        'DaanPitara Hope Foundation',
        'REG/2023/1001',
        2018,
        '50-100',
        'Mumbai, Maharashtra',
        'Dedicated to empowering underprivileged communities through education and healthcare.',
        ['Education', 'Healthcare', 'Women Empowerment'],
        ['Maharashtra', 'Karnataka', 'Delhi'],
        'A world where everyone has access to basic rights.',
        'To bridge the gap between resources and those in need.',
        'Trust',
        19.0760, // Lat
        72.8777  // Lng
      ];
      const res = await client.query(insertNGO, ngoValues);
      ngoId = res.rows[0].id;
      console.log(`Created NGO (ID: ${ngoId})`);
    }

    // Helper for random item
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // 3. Projects
    console.log('Seeding Projects...');
    const projectsData = [
      { title: 'Project Shiksha', sector: 'Education', status: 'active', budget: 500000, raised: 250000, target: 100 },
      { title: 'Healthy Life', sector: 'Healthcare', status: 'active', budget: 1000000, raised: 800000, target: 500 },
      { title: 'Clean Water Initiative', sector: 'Environment', status: 'completed', budget: 300000, raised: 300000, target: 1000 },
      { title: 'Empower Her', sector: 'Women Empowerment', status: 'seeking_funding', budget: 200000, raised: 10000, target: 50 }
    ];

    let projectIds = [];
    for (const p of projectsData) {
        const res = await client.query(`
            INSERT INTO projects (ngo_id, title, sector, status, total_budget, raised_amount, beneficiaries_targeted, start_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
            RETURNING id
        `, [ngoId, p.title, p.sector, p.status, p.budget, p.raised, p.target]);
        projectIds.push(res.rows[0].id);
    }
    console.log(`Seeded ${projectIds.length} projects`);

    // 4. Beneficiaries
    console.log('Seeding Beneficiaries...');
    const beneficiariesData = [
        { name: 'Raju Kumar', age: 10, gender: 'Male', category: 'Child' },
        { name: 'Sita Devi', age: 35, gender: 'Female', category: 'Women' },
        { name: 'Amit Singh', age: 12, gender: 'Male', category: 'Child' },
        { name: 'Gita Ben', age: 65, gender: 'Female', category: 'Elderly' },
        { name: 'Rahul One', age: 8, gender: 'Male', category: 'Child' },
        { name: 'Priya Two', age: 9, gender: 'Female', category: 'Child' },
        { name: 'Ravi Three', age: 11, gender: 'Male', category: 'Child' },
        { name: 'Anjali Four', age: 40, gender: 'Female', category: 'Women' }
    ];

    for (const b of beneficiariesData) {
        await client.query(`
            INSERT INTO beneficiaries (ngo_id, name, age, gender, category, project_id, registered_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())
        `, [ngoId, b.name, b.age, b.gender, b.category, rand(projectIds)]);
    }

    // 5. Volunteers
    console.log('Seeding Volunteers...');
    const volunteersData = [
        { name: 'Vikram Malhotra', skills: 'Teaching, Management' },
        { name: 'Sneha Gupta', skills: 'Medical, First Aid' },
        { name: 'Rohan Das', skills: 'Social Media, Marketing' },
        { name: 'Pooja Sharma', skills: 'Event Planning' },
        { name: 'Arun Kumar', skills: 'Driving, Logistics' }
    ];

    for (const v of volunteersData) {
        await client.query(`
            INSERT INTO volunteers (ngo_id, name, email, skills, status)
            VALUES ($1, $2, $3, $4, 'Active')
        `, [ngoId, v.name, `${v.name.split(' ')[0].toLowerCase()}@example.com`, v.skills]);
    }

    // 6. Events
    console.log('Seeding Events...');
    const eventsData = [
        { title: 'Health Camp 2024', status: 'upcoming', date: new Date('2026-03-15') },
        { title: 'Education Drive', status: 'ongoing', date: new Date() },
        { title: 'Fundraiser Gala', status: 'past', date: new Date('2025-12-25') },
        { title: 'Tree Plantation', status: 'upcoming', date: new Date('2026-04-22') }
    ];

    for (const e of eventsData) {
        await client.query(`
            INSERT INTO events (ngo_id, title, status, date, location, beneficiaries_count)
            VALUES ($1, $2, $3, $4, 'Mumbai', 100)
        `, [ngoId, e.title, e.status, e.date]);
    }

    // 7. Campaigns
    console.log('Seeding Campaigns...');
    const campaignsData = [
        { title: 'Winter Relief Fund', goal: 500000, raised: 120000 },
        { title: 'Education for All', goal: 1000000, raised: 450000 }
    ];

    for (const c of campaignsData) {
        await client.query(`
            INSERT INTO campaigns (ngo_id, title, goal_amount, raised_amount, status)
            VALUES ($1, $2, $3, $4, 'active')
        `, [ngoId, c.title, c.goal, c.raised]);
    }

    // 8. Partners
    console.log('Seeding Partners...');
    const partnersData = [
        { name: 'TechCorp India', type: 'Corporate' },
        { name: 'Smile Foundation', type: 'NGO' },
        { name: 'Local Municipal Corp', type: 'Government' },
        { name: 'Global Pharma', type: 'Corporate' }
    ];

    for (const p of partnersData) {
        await client.query(`
            INSERT INTO partners (ngo_id, organization_name, type, email, status)
            VALUES ($1, $2, $3, $4, 'active')
        `, [ngoId, p.name, p.type, `contact@${p.name.replace(/\s/g,'').toLowerCase()}.com`]);
    }

    // 9. Donations
    console.log('Seeding Donations...');
    const donationsData = [
        { donor: 'John Doe', amount: 5000, type: 'Online' },
        { donor: 'Jane Smith', amount: 10000, type: 'Offline' },
        { donor: 'TechCorp India', amount: 50000, type: 'Online' },
        { donor: 'Anonymous', amount: 2000, type: 'Online' },
        { donor: 'Local Shop', amount: 500, type: 'Offline' }
    ];

    for (const d of donationsData) {
        await client.query(`
            INSERT INTO donations (ngo_id, donor_name, amount, type, date, project_id)
            VALUES ($1, $2, $3, $4, NOW(), $5)
        `, [ngoId, d.donor, d.amount, d.type, rand(projectIds)]);
    }

    // 10. Documents & Awards
    console.log('Seeding Documents & Awards...');
    await client.query(`
        INSERT INTO documents (ngo_id, name, type, url, status)
        VALUES 
        ($1, 'Registration Certificate', 'Legal', 'https://example.com/doc1.pdf', 'approved'),
        ($1, '12A Certificate', 'Tax', 'https://example.com/doc2.pdf', 'approved'),
        ($1, '80G Certificate', 'Tax', 'https://example.com/doc3.pdf', 'pending')
    `, [ngoId]);

    await client.query(`
        INSERT INTO awards (ngo_id, title, year, description)
        VALUES 
        ($1, 'Best NGO 2024', '2024', 'Awarded by State Government'),
        ($1, 'Transparency Award', '2023', 'Awarded for clear financial records')
    `, [ngoId]);

    // 11. Team & Board
    console.log('Seeding Team & Board...');
    await client.query(`
        INSERT INTO team_members (ngo_id, name, role, email)
        VALUES 
        ($1, 'Amit Verma', 'Project Manager', 'amit@ngo.com'),
        ($1, 'Sara Khan', 'Field Officer', 'sara@ngo.com')
    `, [ngoId]);

    await client.query(`
        INSERT INTO ngo_board_members (ngo_id, name, role, email)
        VALUES 
        ($1, 'Dr. R.K. Singh', 'Chairman', 'chairman@ngo.com'),
        ($1, 'Mrs. L. Iyer', 'Secretary', 'sec@ngo.com')
    `, [ngoId]);

    console.log('==============================================');
    console.log('Seeding Complete!');
    console.log('User Email: dummy@daanpitara.com');
    console.log('User Password: password123');
    console.log('==============================================');


  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await client.end();
  }
}

seedDummyData();
