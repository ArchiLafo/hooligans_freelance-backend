/*
  Warnings:

  - You are about to drop the column `format` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "format",
ADD COLUMN     "isOnline" BOOLEAN DEFAULT false;
