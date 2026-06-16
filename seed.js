// seed.js
const db = require("./db/dzle-pool");
const { users, apis, jobs } = require("./db/schema/index.js");
const bcrypt = require("bcrypt");

async function seed() {

    // 1. Insert Users
    console.log("Seeding users...");
    const insertedUsers = await db.insert(users).values([
        {
            username: "ragav_dev",
            email: "ragav@jobflow.dev",
            password: await bcrypt.hash("password123", 10),
        },
        {
            username: "alice_eng",
            email: "alice@jobflow.dev",
            password: await bcrypt.hash("password123", 10),
        },
        {
            username: "bob_tester",
            email: "bob@jobflow.dev",
            password: await bcrypt.hash("password123", 10),
        },
    ]).returning();

    console.log(`Inserted ${insertedUsers.length} users`);

    // 2. Insert API Keys (one per user)
    console.log("Seeding api keys...");
    const apiValues = insertedUsers.map((user) => ({
        api_key: `jf_${require("crypto").randomBytes(24).toString("hex")}`,
        user_id: user.user_id,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
    }));

    const insertedApis = await db.insert(apis).values(apiValues).returning();
    console.log(`Inserted ${insertedApis.length} api keys`);

    // 3. Insert Jobs (not tied to users — matches your schema)
    console.log("Seeding jobs...");
    await db.insert(jobs).values([
        {
            payload: { task: "send_email", to: "ragav@jobflow.dev" },
            status: "pending",
            priority: 1,
        },
        {
            payload: { task: "generate_report", report_id: "rpt_001" },
            status: "in_progress",
            priority: 5,
        },
        {
            payload: { task: "resize_image", url: "https://cdn.example.com/img.png" },
            status: "completed",
            priority: 2,
        },
        {
            payload: { task: "sync_data", source: "crm", destination: "db" },
            status: "failed",
            priority: 3,
        },
        {
            payload: { task: "send_email", to: "alice@jobflow.dev" },
            status: "pending",
            priority: 0,
        },
    ]);

    console.log("Seeding complete.");
    process.exit(0);
}

seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});