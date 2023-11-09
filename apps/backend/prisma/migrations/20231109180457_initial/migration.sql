-- CreateTable
CREATE TABLE "new_trainings_scheduled_notifications" (
    "id" UUID NOT NULL,
    "training_creator_id" UUID NOT NULL,
    "training_id" UUID NOT NULL,
    "subscribers" UUID[],

    CONSTRAINT "new_trainings_scheduled_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "new_trainings_scheduled_notifications_id_key" ON "new_trainings_scheduled_notifications"("id");

-- AddForeignKey
ALTER TABLE "new_trainings_scheduled_notifications" ADD CONSTRAINT "new_trainings_scheduled_notifications_training_creator_id_fkey" FOREIGN KEY ("training_creator_id") REFERENCES "trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "new_trainings_scheduled_notifications" ADD CONSTRAINT "new_trainings_scheduled_notifications_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
