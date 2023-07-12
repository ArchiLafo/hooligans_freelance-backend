/*
  Warnings:

  - You are about to drop the `DisciplineInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DisciplineInfo" DROP CONSTRAINT "DisciplineInfo_id_student_fkey";

-- DropForeignKey
ALTER TABLE "DisciplineInfo" DROP CONSTRAINT "DisciplineInfo_id_subject_fkey";

-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_id_teacher_fkey";

-- DropTable
DROP TABLE "DisciplineInfo";

-- DropTable
DROP TABLE "students";

-- DropTable
DROP TABLE "subjects";

-- DropTable
DROP TABLE "teachers";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
