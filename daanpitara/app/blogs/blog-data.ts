
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string; // Display name (Badge)
  categoryId: string; // For filtering (matches CATEGORIES.id)
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const CATEGORIES = [
  { id: 'csr-impact', name: 'CSR Impact', icon: 'HandHeart', color: 'bg-blue-50 text-blue-600', count: 24 },
  { id: 'ngo-digitalization', name: 'NGO Digitalization', icon: 'Laptop', color: 'bg-indigo-50 text-indigo-600', count: 24 },
  { id: 'donor-engagement', name: 'Donor Engagement', icon: 'Users', color: 'bg-sky-50 text-sky-600', count: 24 },
];

export const BLOG_POSTS: BlogPost[] = [
  // CSR Impact
  {
    id: '1',
    slug: 'digital-transformation-ngo-2024',
    title: 'How Digital Transformation is Revolutionizing NGO Operations in 2024',
    excerpt: 'Explore how nonprofits are leveraging technology to streamline operations, increase transparency, and amplify their social impact. From cloud-based donor management to AI-powered fundraising analytics.',
    content: `
      <h2>The Digital Shift in the Social Sector</h2>
      <p>The landscape of the non-profit sector is undergoing a massive transformation. Gone are the days of manual record-keeping and scattered excel sheets. Today, NGOs are embracing digital tools to drive efficiency and transparency.</p>
      
      <h3>1. Cloud-Based Management</h3>
      <p>Cloud platforms allow teams to collaborate from anywhere, ensuring that field data reaches the headquarters in real-time. This connectivity is crucial for rapid response during crises.</p>

      <h3>2. Data-Driven Decision Making</h3>
      <p>With advanced analytics, NGOs can now understand donor behavior, predict funding trends, and measure the real-world impact of their programs with precision.</p>

      <h3>3. Building Trust through Transparency</h3>
      <p>Digital platforms enable NGOs to showcase their work through verified reports and real-time updates, fostering deeper trust with corporate partners and individual donors.</p>
    `,
    category: 'NGO Digitalization',
    categoryId: 'ngo-digitalization',
    author: {
      name: 'Rajesh Kumar',
      avatar: '/blogs/rajesh-kumar.png',
      role: 'Tech Consultant'
    },
    image: '/blogs/digital-transformation.png',
    date: 'Nov 15, 2024',
    readTime: '8 min read',
    tags: ['Technology', 'Innovation', 'Future of Work']
  },
  {
    id: '2',
    slug: 'ai-social-impact',
    title: 'How DP Uses AI to Increase Social Impact?',
    excerpt: 'Learn how DaanPitara can use AI to match donors better, built trust, predict funding trends and automate administrative tasks.',
    content: '<h2>AI in Social Impact</h2><p>Artificial Intelligence is reshaping how NGOs operate...</p>',
    category: 'Innovation & Technology',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Tech Lead' },
    image: '/blogs/ai-impact.png',
    date: 'Oct 23, 2025',
    readTime: '6 min read',
    tags: ['AI', 'Impact']
  },
  {
    id: '3',
    slug: 'digital-transformation-csr',
    title: 'The Digital Transformation of CSR Funding in India: DaanPitara\'s Model',
    excerpt: 'Discover how DaanPitara is transforming CSR in India through digital transparency, verified networks, and real-time impact tracking.',
    content: '<h2>Digital Transformation</h2><p>The digitization of CSR funding ensures greater transparency...</p>',
    category: 'CSR Innovation',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'CSR Specialist' },
    image: '/blogs/csr-digital.png',
    date: 'Nov 18, 2025',
    readTime: '6 min read',
    tags: ['CSR', 'Digital']
  },
  {
    id: '4',
    slug: 'addressing-poverty-india',
    title: 'Addressing Poverty in India: Challenges and Solutions',
    excerpt: 'A simple guide to understanding poverty in India and how digital platforms like DaanPitara are enabling grassroots change.',
    content: '<h2>Addressing Poverty</h2><p>Poverty remains a significant challenge...</p>',
    category: 'Social Impact',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Impact Officer' },
    image: '/blogs/poverty-solutions.png',
    date: 'Nov 24, 2025',
    readTime: '6 min read',
    tags: ['Poverty', 'India']
  },
  {
    id: '5',
    slug: 'environmental-conservation-innovations',
    title: 'Innovations in Environmental Conservation',
    excerpt: 'Discover how DaanPitara supports innovative, tech-driven and community-led initiatives to protect our planet.',
    content: '<h2>Environment Conservation</h2><p>Innovation is key to tackling climate change...</p>',
    category: 'Environment & Sustainability',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Eco Specialist' },
    image: '/blogs/environmental_conservation.png',
    date: 'Nov 28, 2025',
    readTime: '5 min read',
    tags: ['Environment', 'Innovation']
  },
  {
    id: '6',
    slug: 'day-in-life-ngo-volunteer',
    title: 'A Day in the Life of an NGO Volunteer',
    excerpt: 'Learn the latest strategies and tools for automating your social media.',
    content: '<h2>Volunteering Life</h2><p>Volunteers are the backbone of any NGO...</p>',
    category: 'Volunteer Stories',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Volunteer' },
    image: '/blogs/volunteer_life.png',
    date: 'Dec 02, 2025',
    readTime: '6 min read',
    tags: ['Volunteer', 'Stories']
  },

  // Donor Engagement
  {
      id: '7',
      slug: 'building-donor-trust',
      title: 'Building Long-Term Donor Relationships with Trust',
      excerpt: 'Strategies to build trust, retain donors, and maximize fundraising through transparency and consistent communication.',
      content: '<h2>Building Trust</h2><p>Trust is the currency of the non-profit sector...</p>',
      category: 'Donor Engagement',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Donor Relations' },
      image: '/blogs/donor_trust.png',
      date: 'Oct 11, 2025',
      readTime: '6 min read',
      tags: ['Trust', 'Donors']
  },
  {
      id: '8',
      slug: 'personalized-donor-communication',
      title: 'Personalized Donor Communication Best Practices',
      excerpt: 'Learn how to craft compelling messages that resonate with donors and drive engagement.',
      content: '<h2>Personalized Communication</h2><p>Generic emails no longer work...</p>',
      category: 'Donor Communication',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Comms Lead' },
      image: '/blogs/donor_communication.png',
      date: 'Oct 23, 2025',
      readTime: '6 min read',
      tags: ['Communication', 'Personalization']
  },
  {
      id: '9',
      slug: 'donor-retention-strategies',
      title: 'The Ultimate Guide to Donor Retention Strategies',
      excerpt: 'Discover proven strategies to keep your donors engaged and committed to your cause for the long haul.',
      content: '<h2>Donor Retention</h2><p>Retaining donors is more cost-effective than acquiring new ones...</p>',
      category: 'Donor Retention',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Retention Expert' },
      image: '/blogs/donor_retention.png',
      date: 'Nov 18, 2025',
      readTime: '6 min read',
      tags: ['Retention', 'Strategy']
  },
  {
      id: '10',
      slug: 'impactful-donor-reports',
      title: 'Creating Impactful Donor Reports for Transparency',
      excerpt: 'Learn how to create transparent and compelling impact reports that showcase your organization\'s achievements.',
      content: '<h2>Impact Reporting</h2><p>Donors want to see the impact of their contributions...</p>',
      category: 'Impact Reporting',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Impact Analyst' },
      image: '/blogs/impact_reporting.png',
      date: 'Nov 24, 2025',
      readTime: '6 min read',
      tags: ['Reporting', 'transparency']
  },
  {
      id: '11',
      slug: 'thank-recognize-donors',
      title: 'Creative Ways to Thank and Recognize Donors',
      excerpt: 'Explore innovative donor recognition strategies that make supporters feel valued and appreciated.',
      content: '<h2>Thanking Donors</h2><p>A simple thank you goes a long way...</p>',
      category: 'Donor Recognition',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Donor Relations' },
      image: '/blogs/thank_donors.png',
      date: 'Nov 28, 2025',
      readTime: '6 min read',
      tags: ['Recognition', 'Gratitude']
  },
  {
      id: '12',
      slug: 'social-media-donor-engagement',
      title: 'Leveraging Social Media for Donor Engagement',
      excerpt: 'A comprehensive guide to using social platforms to connect with donors and amplify your message.',
      content: '<h2>Social Media Engagement</h2><p>Social media is a powerful tool for connecting with donors...</p>',
      category: 'Digital Engagement',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Social Media' },
      image: '/blogs/social_media_engagment.png',
      date: 'Dec 02, 2025',
      readTime: '6 min read',
      tags: ['Social Media', 'Engagement']
  },

  // NGO Digitalization
  {
      id: '13',
      slug: 'cloud-solutions-ngos',
      title: 'Cloud-Based Solutions for Modern NGOs in digital India',
      excerpt: 'Learn how NGOs can leverage cloud technology to streamline operations and improve efficiency.',
      content: '<h2>Cloud Solutions</h2><p>Cloud technology offers NGOs flexible and scalable solutions...</p>',
      category: 'NGO Digitalization',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Tech Consultant' },
      image: '/blogs/cloud_solutions_ngo.png',
      date: 'Oct 11, 2025',
      readTime: '6 min read',
      tags: ['Cloud', 'Digitalization']
  },
  {
      id: '14',
      slug: 'essential-digital-tools',
      title: 'Essential Digital Tools Every NGO Needs in 2025',
      excerpt: 'Learn how DaanPitara can use AI to match donors better, built trust, predict funding trends.',
      content: '<h2>Digital Tools</h2><p>The right digital tools can transform an NGO\'s operations...</p>',
      category: 'Technology Tools',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Tech Lead' },
      image: '/blogs/essential_tools_ngo.png',
      date: 'Oct 23, 2025',
      readTime: '6 min read',
      tags: ['Tools', 'Essentials']
  },
  {
      id: '15',
      slug: 'data-driven-ngo',
      title: 'Building a Data-Driven NGO: Best Practices',
      excerpt: 'A comprehensive guide to implementing data analytics and management systems for better impact.',
      content: '<h2>Data-Driven NGO</h2><p>Data is a strategic asset for NGOs...</p>',
      category: 'Data Management',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Data Scientist' },
      image: '/blogs/data_driven_ngo.png',
      date: 'Nov 18, 2025',
      readTime: '6 min read',
      tags: ['Data', 'Analytics']
  },
  {
      id: '16',
      slug: 'protecting-ngo-cyber-threats',
      title: 'Protecting Your NGO from Cyber Threats',
      excerpt: 'Essential cybersecurity practices to safeguard your organization\'s data and maintain donor trust.',
      content: '<h2>Cybersecurity</h2><p>As NGOs go digital, cybersecurity becomes paramount...</p>',
      category: 'Cybersecurity',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Security Expert' },
      image: '/blogs/cyber_security_ngo.png',
      date: 'Nov 24, 2025',
      readTime: '6 min read',
      tags: ['Security', 'Cyber']
  },
  {
      id: '17',
      slug: 'mobile-first-field-ops',
      title: 'Mobile-First Strategies for Field Operations',
      excerpt: 'Learn how to use mobile apps to improve communication and data collection in the field.',
      content: '<h2>Mobile Strategies</h2><p>Mobile technology is revolutionizing field operations...</p>',
      category: 'Mobile Technology',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Field Ops' },
      image: '/blogs/mobile_field_ops.png',
      date: 'Nov 28, 2025',
      readTime: '6 min read',
      tags: ['Mobile', 'Field Work']
  },
  {
      id: '18',
      slug: 'automating-admin-tasks',
      title: 'Automating Administrative Tasks in NGOs',
      excerpt: 'Discover automation tools that can free up your team to focus on mission-critical activities.',
      content: '<h2>Automation</h2><p>Automation can save time and resources...</p>',
      category: 'Automation',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: '/blogs/marcus-chen.png', role: 'Ops Manager' },
      image: '/blogs/automation_ngo.png',
      date: 'Dec 02, 2025',
      readTime: '6 min read',
      tags: ['Automation', 'Efficiency']
  }
];

