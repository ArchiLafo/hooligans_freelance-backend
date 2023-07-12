-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'User';
