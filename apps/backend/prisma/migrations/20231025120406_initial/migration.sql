/*
  Warnings:

  - You are about to alter the column `training_type` on the `trainings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "trainings" ALTER COLUMN "training_type" SET NOT NULL,
ALTER COLUMN "training_type" SET DATA TYPE VARCHAR(64);
