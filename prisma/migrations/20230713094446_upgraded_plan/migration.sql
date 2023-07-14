/*
  Warnings:

  - You are about to drop the column `dayTime` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `day` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minutes` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "dayTime",
ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "hours" TEXT NOT NULL,
ADD COLUMN     "minutes" TEXT NOT NULL,
ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
