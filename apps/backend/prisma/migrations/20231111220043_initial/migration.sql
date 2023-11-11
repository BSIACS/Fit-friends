/*
  Warnings:

  - You are about to drop the column `avatar_src` on the `trainers` table. All the data in the column will be lost.
  - You are about to drop the column `background_image_src` on the `trainers` table. All the data in the column will be lost.
  - You are about to drop the column `certificate_src` on the `trainers` table. All the data in the column will be lost.
  - You are about to drop the column `background_img_src` on the `trainings` table. All the data in the column will be lost.
  - You are about to drop the column `video_demo_src` on the `trainings` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_src` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `background_image_src` on the `users` table. All the data in the column will be lost.
  - Added the required column `avatar_file_name` to the `trainers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_image_file_name` to the `trainers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificate_file_name` to the `trainers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_img_file_name` to the `trainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_demo_file_name` to the `trainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar_file_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_image_file_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainers" DROP COLUMN "avatar_src",
DROP COLUMN "background_image_src",
DROP COLUMN "certificate_src",
ADD COLUMN     "avatar_file_name" VARCHAR(256) NOT NULL,
ADD COLUMN     "background_image_file_name" VARCHAR(256) NOT NULL,
ADD COLUMN     "certificate_file_name" VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "background_img_src",
DROP COLUMN "video_demo_src",
ADD COLUMN     "background_img_file_name" VARCHAR(256) NOT NULL,
ADD COLUMN     "video_demo_file_name" VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_src",
DROP COLUMN "background_image_src",
ADD COLUMN     "avatar_file_name" VARCHAR(256) NOT NULL,
ADD COLUMN     "background_image_file_name" VARCHAR(256) NOT NULL;
