/*
  Warnings:

  - A unique constraint covering the columns `[verifyCode]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admins_verifyCode_key" ON "Admins"("verifyCode");
