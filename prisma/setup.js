const { PrismaClient } = require("../generated/prisma/index.js");

const prisma = new PrismaClient();

async function connectPsql() {
    try {
        await prisma.$connect();
        console.log("✅ Database connected");
    } catch (error) {
        console.log("❌ Database disconnected", error);
    }
}

connectPsql();

module.exports = prisma;