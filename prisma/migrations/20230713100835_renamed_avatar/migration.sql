/*
  Warnings:

  - You are about to drop the column `awatar` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "awatar",
ADD COLUMN     "avatar" TEXT DEFAULT './images/unused-profile-preview.jpg';
