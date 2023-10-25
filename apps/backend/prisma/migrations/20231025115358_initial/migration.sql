/*
  Warnings:

  - You are about to alter the column `certificate_src` on the `trainers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(256)`.

*/
-- AlterTable
ALTER TABLE "trainers" ALTER COLUMN "certificate_src" SET NOT NULL,
ALTER COLUMN "certificate_src" SET DATA TYPE VARCHAR(256);
