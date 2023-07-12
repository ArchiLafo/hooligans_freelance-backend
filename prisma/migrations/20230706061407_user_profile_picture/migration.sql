-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "image" SET DEFAULT './images/unused-service-preview.jpg';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "awatar" TEXT DEFAULT './images/unused-service-preview.jpg';
