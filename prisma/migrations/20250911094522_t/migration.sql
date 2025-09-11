/*
  Warnings:

  - Changed the type of `type` on the `Workers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "workerType" AS ENUM ('monthly', 'weekly', 'daily');

-- AlterTable
ALTER TABLE "Workers" DROP COLUMN "type",
ADD COLUMN     "type" "workerType" NOT NULL;

-- DropEnum
DROP TYPE "workerTytpe";
