/*
  Warnings:

  - Added the required column `points_sum` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "points_sum" INTEGER NOT NULL;
