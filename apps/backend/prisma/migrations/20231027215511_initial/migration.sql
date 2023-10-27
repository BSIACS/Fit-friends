/*
  Warnings:

  - You are about to drop the column `statusChangedAt` on the `personal_training_requests` table. All the data in the column will be lost.
  - Added the required column `status_changed_at` to the `personal_training_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "personal_training_requests" DROP COLUMN "statusChangedAt",
ADD COLUMN     "status_changed_at" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "refresh_tokens" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "expires_in" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "trainers" ALTER COLUMN "birth_date" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "birth_date" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;
