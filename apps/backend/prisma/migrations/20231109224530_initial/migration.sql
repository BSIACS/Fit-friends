/*
  Warnings:

  - You are about to alter the column `rating` on the `trainings` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `votes_number` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "votes_number" INTEGER NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;
