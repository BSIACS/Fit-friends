/*
  Warnings:

  - You are about to drop the column `training_creator_id` on the `new_trainings_scheduled_notifications` table. All the data in the column will be lost.
  - Added the required column `trainer_id` to the `new_trainings_scheduled_notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "new_trainings_scheduled_notifications" DROP CONSTRAINT "new_trainings_scheduled_notifications_training_creator_id_fkey";

-- AlterTable
ALTER TABLE "new_trainings_scheduled_notifications" DROP COLUMN "training_creator_id",
ADD COLUMN     "trainer_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "new_trainings_scheduled_notifications" ADD CONSTRAINT "new_trainings_scheduled_notifications_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
