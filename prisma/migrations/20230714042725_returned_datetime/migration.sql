/*
  Warnings:

  - You are about to drop the column `day` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `minutes` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `datetime` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "day",
DROP COLUMN "hours",
DROP COLUMN "minutes",
DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "datetime" TEXT NOT NULL;
