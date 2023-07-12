/*
  Warnings:

  - You are about to drop the column `day` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `dayTime` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "day",
DROP COLUMN "time",
ADD COLUMN     "dayTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "duration" TEXT NOT NULL;
