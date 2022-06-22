/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_slug_key" ON "Medicine"("slug");
