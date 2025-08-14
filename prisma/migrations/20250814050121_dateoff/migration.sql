/*
  Warnings:

  - You are about to drop the column `days` on the `DayOff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DayOff" DROP COLUMN "days";

-- CreateTable
CREATE TABLE "DayOffDate" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "dayOffId" INTEGER NOT NULL,

    CONSTRAINT "DayOffDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DayOffDate_dayOffId_date_key" ON "DayOffDate"("dayOffId", "date");

-- AddForeignKey
ALTER TABLE "DayOffDate" ADD CONSTRAINT "DayOffDate_dayOffId_fkey" FOREIGN KEY ("dayOffId") REFERENCES "DayOff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
