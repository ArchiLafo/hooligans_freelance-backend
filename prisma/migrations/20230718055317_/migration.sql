/*
  Warnings:

  - The values [Moderator] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('User', 'Employee', 'Leader', 'Admin');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'User';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idCompany" INTEGER,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "leaderId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_leaderId_key" ON "Company"("leaderId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
