/*
  Warnings:

  - You are about to drop the column `certificate_file_name` on the `trainers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trainers" DROP COLUMN "certificate_file_name",
ADD COLUMN     "certificate_files_names" VARCHAR(256)[];
