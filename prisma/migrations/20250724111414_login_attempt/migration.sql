/*
  Warnings:

  - You are about to drop the `rate_limiter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "rate_limiter";

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "ipAddress" VARCHAR(255),
    "success" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginBlock" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "ipAddress" VARCHAR(255),
    "blockedUntil" TIMESTAMP(3) NOT NULL,
    "failLevel" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "LoginBlock_pkey" PRIMARY KEY ("id")
);
