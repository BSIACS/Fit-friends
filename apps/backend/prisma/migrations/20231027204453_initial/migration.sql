/*
  Warnings:

  - You are about to drop the column `createdAt` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `personal_training_requests` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `refresh_token` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `refresh_token` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `trainers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `personal_training_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `refresh_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_in` to the `refresh_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `refresh_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `refresh_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `trainers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "refresh_token_email_key";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "personal_training_requests" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "refresh_token" DROP COLUMN "email",
DROP COLUMN "refreshToken",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "trainers" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
