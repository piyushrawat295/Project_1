
import { db } from "@/lib/db";
import { activityLogs, ngos, users } from "@/lib/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Seeding activities...");

  // Find the first NGO (assuming it belongs to our demo user)
  const ngo = await db.query.ngos.findFirst();

  if (!ngo) {
    console.error("No NGO found to seed activities for.");
    process.exit(1);
  }

  console.log(`Seeding activities for NGO: ${ngo.name} (ID: ${ngo.id})`);

  const activities = [
    {
      action: "Document Verified",
      details: "Your 80G Certificate has been verified",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      action: "New Message",
      details: "Message from TechCorp CSR Team",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      action: "CSR Opportunity Match",
      details: "New opportunity matches your profile",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      action: "Profile Updated",
      details: "Organization details updated",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      action: "Document Uploaded",
      details: "Registration Certificate uploaded",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  ];

  for (const activity of activities) {
    await db.insert(activityLogs).values({
      ngoId: ngo.id,
      action: activity.action,
      details: activity.details,
      createdAt: activity.createdAt,
    });
  }

  console.log("Activities seeded successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding activities:", err);
  process.exit(1);
});
