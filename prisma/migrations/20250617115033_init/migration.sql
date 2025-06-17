-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPERADMIN');

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
    "image" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workers" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(400) NOT NULL,
    "position" VARCHAR(200) NOT NULL,
    "salary" INTEGER NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "GENDER" NOT NULL,
    "passport" VARCHAR(255) NOT NULL,
    "image" TEXT,
    "face_encoding" JSONB,
    "is_active" BOOLEAN NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Admins_username_key" ON "Admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_phone_key" ON "Admins"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Workers_phone_key" ON "Workers"("phone");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
