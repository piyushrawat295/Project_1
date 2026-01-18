
import { BlogPost } from './blog-data';

// Helper to generate the data structure quickly
// This file is just for me to Copy-Paste into the tool
export const BLOG_POSTS: BlogPost[] = [
  // CSR Impact (id: csr-impact)
  {
    id: '1',
    slug: 'attracting-corporate-support',
    title: 'A Comprehensive Guide to Attracting Corporate Support',
    excerpt: 'Learn how NGOs can attract and secure CSR funding through compliance, strategic partnerships, and impactful storytelling.',
    content: '...',
    category: 'CSR Funding',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'CSR Specialist' },
    image: '/blogs/corporate-support.png',
    date: 'Oct 11, 2025',
    readTime: '6 min read',
    tags: ['CSR', 'Funding']
  },
  {
    id: '2',
    slug: 'ai-social-impact',
    title: 'How DP Uses AI to Increase Social Impact?',
    excerpt: 'Learn how DaanPitara can use AI to match donors better, built trust, predict funding trends and automate administrative tasks.',
    content: '...',
    category: 'Innovation & Technology',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Tech Lead' },
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
    content: '...',
    category: 'CSR Innovation',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'CSR Specialist' },
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
    content: '...',
    category: 'Social Impact',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Impact Officer' },
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
    content: '...',
    category: 'Environment & Sustainability',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Eco Specialist' },
    image: '/blogs/digital-transformation.png', // Placeholder reuse or need new image
    date: 'Nov 28, 2025',
    readTime: '5 min read',
    tags: ['Environment', 'Innovation']
  },
  {
    id: '6',
    slug: 'day-in-life-ngo-volunteer',
    title: 'A Day in the Life of an NGO Volunteer',
    excerpt: 'Learn the latest strategies and tools for automating your social media.', // Text from screenshot seems mismatched in image 1 vs title? Screenshot 1 card 6 says "A Day in the Life..." and excerpt "Learn the latest strategies...". Wait, the screenshot has mismatch content? The title is "A Day in the Life..." but excerpt is "Learn the latest strategies...". I will use the Title as truth and write relevant excerpt or copy the screenshot exactly. Copying screenshot exactly is safer.
    content: '...',
    category: 'Volunteer Stories',
    categoryId: 'csr-impact',
    author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Volunteer' },
    image: '/blogs/corporate-support.png', // Placeholder
    date: 'Dec 02, 2025',
    readTime: '6 min read',
    tags: ['Volunteer', 'Stories']
  },

  // Donor Engagement (id: donor-engagement)
  {
      id: '7',
      slug: 'building-donor-trust',
      title: 'Building Long-Term Donor Relationships with Trust',
      excerpt: 'Strategies to build trust, retain donors, and maximize fundraising through transparency and consistent communication.',
      content: '...',
      category: 'Donor Engagement',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Donor Relations' },
      image: '/blogs/poverty-solutions.png',
      date: 'Oct 11, 2025',
      readTime: '6 min read',
      tags: ['Trust', 'Donors']
  },
  {
      id: '8',
      slug: 'personalized-donor-communication',
      title: 'Personalized Donor Communication Best Practices',
      excerpt: 'Learn how to craft compelling messages that resonate with donors and drive engagement.',
      content: '...',
      category: 'Donor Communication',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Comms Lead' },
      image: '/blogs/ai-impact.png',
      date: 'Oct 23, 2025',
      readTime: '6 min read',
      tags: ['Communication', 'Personalization']
  },
  {
      id: '9',
      slug: 'donor-retention-strategies',
      title: 'The Ultimate Guide to Donor Retention Strategies',
      excerpt: 'Discover proven strategies to keep your donors engaged and committed to your cause for the long haul.',
      content: '...',
      category: 'Donor Retention',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Retention Expert' },
      image: '/blogs/csr-digital.png',
      date: 'Nov 18, 2025',
      readTime: '6 min read',
      tags: ['Retention', 'Strategy']
  },
  {
      id: '10',
      slug: 'impactful-donor-reports',
      title: 'Creating Impactful Donor Reports for Transparency',
      excerpt: 'Learn how to create transparent and compelling impact reports that showcase your organization\'s achievements.',
      content: '...',
      category: 'Impact Reporting',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Impact Analyst' },
      image: '/blogs/digital-transformation.png',
      date: 'Nov 24, 2025',
      readTime: '6 min read',
      tags: ['Reporting', 'transparency']
  },
  {
      id: '11',
      slug: 'thank-recognize-donors',
      title: 'Creative Ways to Thank and Recognize Donors',
      excerpt: 'Explore innovative donor recognition strategies that make supporters feel valued and appreciated.',
      content: '...',
      category: 'Donor Recognition',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Donor Relations' },
      image: '/blogs/corporate-support.png',
      date: 'Nov 28, 2025',
      readTime: '6 min read',
      tags: ['Recognition', 'Gratitude']
  },
  {
      id: '12',
      slug: 'social-media-donor-engagement',
      title: 'Leveraging Social Media for Donor Engagement',
      excerpt: 'A comprehensive guide to using social platforms to connect with donors and amplify your message.',
      content: '...',
      category: 'Digital Engagement',
      categoryId: 'donor-engagement',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Social Media' },
      image: '/blogs/ai-impact.png',
      date: 'Dec 02, 2025',
      readTime: '6 min read',
      tags: ['Social Media', 'Engagement']
  },

  // NGO Digitalization (id: ngo-digitalization)
  {
      id: '13',
      slug: 'cloud-solutions-ngos',
      title: 'Cloud-Based Solutions for Modern NGOs in digital India',
      excerpt: 'Learn how NGOs can leverage cloud technology to streamline operations and improve efficiency.',
      content: '...',
      category: 'NGO Digitalization',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Tech Consultant' },
      image: '/blogs/digital-transformation.png',
      date: 'Oct 11, 2025',
      readTime: '6 min read',
      tags: ['Cloud', 'Digitalization']
  },
  {
      id: '14',
      slug: 'essential-digital-tools',
      title: 'Essential Digital Tools Every NGO Needs in 2025',
      excerpt: 'Learn how DaanPitara can use AI to match donors better, built trust, predict funding trends.',
      content: '...',
      category: 'Technology Tools',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Tech Lead' },
      image: '/blogs/ai-impact.png',
      date: 'Oct 23, 2025',
      readTime: '6 min read',
      tags: ['Tools', 'Essentials']
  },
  {
      id: '15',
      slug: 'data-driven-ngo',
      title: 'Building a Data-Driven NGO: Best Practices',
      excerpt: 'A comprehensive guide to implementing data analytics and management systems for better impact.',
      content: '...',
      category: 'Data Management',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Data Scientist' },
      image: '/blogs/csr-digital.png',
      date: 'Nov 18, 2025',
      readTime: '6 min read',
      tags: ['Data', 'Analytics']
  },
  {
      id: '16',
      slug: 'protecting-ngo-cyber-threats',
      title: 'Protecting Your NGO from Cyber Threats',
      excerpt: 'Essential cybersecurity practices to safeguard your organization\'s data and maintain donor trust.',
      content: '...',
      category: 'Cybersecurity',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Security Expert' },
      image: '/blogs/poverty-solutions.png',
      date: 'Nov 24, 2025',
      readTime: '6 min read',
      tags: ['Security', 'Cyber']
  },
  {
      id: '17',
      slug: 'mobile-first-field-ops',
      title: 'Mobile-First Strategies for Field Operations',
      excerpt: 'Learn how to use mobile apps to improve communication and data collection in the field.',
      content: '...',
      category: 'Mobile Technology',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Field Ops' },
      image: '/blogs/corporate-support.png',
      date: 'Nov 28, 2025',
      readTime: '6 min read',
      tags: ['Mobile', 'Field Work']
  },
  {
      id: '18',
      slug: 'automating-admin-tasks',
      title: 'Automating Administrative Tasks in NGOs',
      excerpt: 'Discover automation tools that can free up your team to focus on mission-critical activities.',
      content: '...',
      category: 'Automation',
      categoryId: 'ngo-digitalization',
      author: { name: 'Marcus Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', role: 'Ops Manager' },
      image: '/blogs/ai-impact.png',
      date: 'Dec 02, 2025',
      readTime: '6 min read',
      tags: ['Automation', 'Efficiency']
  }
];
