-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "workerType" AS ENUM ('monthly', 'weekly', 'daily');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "role" "Role" NOT NULL,
    "branchId" INTEGER,
    "image" TEXT,
    "image_path" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workers" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(400) NOT NULL,
    "position" VARCHAR(200) NOT NULL,
    "type" "workerType" NOT NULL,
    "salary" INTEGER NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "gender" "GENDER" NOT NULL,
    "description" VARCHAR NOT NULL,
    "branchId" INTEGER,
    "image" TEXT,
    "image_path" TEXT,
    "is_active" BOOLEAN NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "dayoffId" INTEGER NOT NULL,
    "breakId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "workerId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "clock_in" TIME NOT NULL,
    "clock_out" TIME NOT NULL,
    "late_minutes" INTEGER NOT NULL,
    "early_leave" INTEGER NOT NULL,
    "worked_hours" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

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
    "blockedUntil" TIMESTAMP(3),
    "failLevel" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "LoginBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Break" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "startTime" VARCHAR NOT NULL,
    "endTime" VARCHAR NOT NULL,
    "lateAllow" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "Break_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayOff" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "DayOff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayOffDate" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "dayOffId" INTEGER NOT NULL,

    CONSTRAINT "DayOffDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "startTime" VARCHAR NOT NULL,
    "endTime" VARCHAR NOT NULL,
    "lateAllow" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_username_key" ON "Admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_phone_key" ON "Admins"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Workers_phone_key" ON "Workers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "DayOffDate_dayOffId_date_key" ON "DayOffDate"("dayOffId", "date");

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_dayoffId_fkey" FOREIGN KEY ("dayoffId") REFERENCES "DayOff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_breakId_fkey" FOREIGN KEY ("breakId") REFERENCES "Break"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayOffDate" ADD CONSTRAINT "DayOffDate_dayOffId_fkey" FOREIGN KEY ("dayOffId") REFERENCES "DayOff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
