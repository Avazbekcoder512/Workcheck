/*
  Warnings:

  - You are about to drop the column `age` on the `Workers` table. All the data in the column will be lost.
  - You are about to drop the column `face_encoding` on the `Workers` table. All the data in the column will be lost.
  - You are about to drop the column `passport` on the `Workers` table. All the data in the column will be lost.
  - Added the required column `breakId` to the `Workers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayoffId` to the `Workers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Workers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftId` to the `Workers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Workers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "workerTytpe" AS ENUM ('monthly', 'weekly', 'daily');

-- AlterTable
ALTER TABLE "Workers" DROP COLUMN "age",
DROP COLUMN "face_encoding",
DROP COLUMN "passport",
ADD COLUMN     "breakId" INTEGER NOT NULL,
ADD COLUMN     "dayoffId" INTEGER NOT NULL,
ADD COLUMN     "description" VARCHAR NOT NULL,
ADD COLUMN     "shiftId" INTEGER NOT NULL,
ADD COLUMN     "type" "workerTytpe" NOT NULL;

-- CreateTable
CREATE TABLE "Break" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "lateAllow" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "Break_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayOff" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "days" DATE NOT NULL,

    CONSTRAINT "DayOff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "lateAllow" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_dayoffId_fkey" FOREIGN KEY ("dayoffId") REFERENCES "DayOff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_breakId_fkey" FOREIGN KEY ("breakId") REFERENCES "Break"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
