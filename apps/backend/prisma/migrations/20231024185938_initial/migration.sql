-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "avatar_src" VARCHAR(256) NOT NULL,
    "password_hash" VARCHAR(64) NOT NULL,
    "sex" VARCHAR(64) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "role" VARCHAR(64) NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "location" VARCHAR(64) NOT NULL,
    "background_image_src" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "training_level" VARCHAR(64) NOT NULL,
    "training_type" VARCHAR(64)[],
    "training_duration" VARCHAR(64) NOT NULL,
    "calories" INTEGER NOT NULL,
    "calories_per_day" INTEGER NOT NULL,
    "is_ready_for_training" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainers" (
    "id" UUID NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "avatar_src" VARCHAR(256) NOT NULL,
    "password_hash" VARCHAR(64) NOT NULL,
    "sex" VARCHAR(64) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "role" VARCHAR(64) NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "location" VARCHAR(64) NOT NULL,
    "background_image_src" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "training_level" VARCHAR(64) NOT NULL,
    "training_type" VARCHAR(64)[],
    "certificate_src" VARCHAR(256)[],
    "merits" VARCHAR(256) NOT NULL,
    "is_ready_for_training" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trainers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" UUID NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "background_img_src" VARCHAR(256) NOT NULL,
    "training_level" VARCHAR(64) NOT NULL,
    "training_type" VARCHAR(64)[],
    "training_duration" VARCHAR(64) NOT NULL,
    "price" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "sex" VARCHAR(64) NOT NULL,
    "video_demo_src" VARCHAR(256) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "training_creator_id" UUID NOT NULL,
    "is_special" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "training_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" VARCHAR(1024) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "purchase_type" VARCHAR(64) NOT NULL,
    "training_id" UUID NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "payment_method" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_training_requests" (
    "id" UUID NOT NULL,
    "requestor_id" UUID NOT NULL,
    "responser_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "statusChangedAt" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(64) NOT NULL,

    CONSTRAINT "personal_training_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "text" VARCHAR(256) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_balances" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "training_id" UUID NOT NULL,
    "remained" INTEGER NOT NULL,

    CONSTRAINT "user_balances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "trainers_id_key" ON "trainers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "trainers_email_key" ON "trainers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "trainings_id_key" ON "trainings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_id_key" ON "reviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "purchases_id_key" ON "purchases"("id");

-- CreateIndex
CREATE UNIQUE INDEX "personal_training_requests_id_key" ON "personal_training_requests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_id_key" ON "notifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_balances_id_key" ON "user_balances"("id");

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_training_creator_id_fkey" FOREIGN KEY ("training_creator_id") REFERENCES "trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_training_requests" ADD CONSTRAINT "personal_training_requests_requestor_id_fkey" FOREIGN KEY ("requestor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_training_requests" ADD CONSTRAINT "personal_training_requests_responser_id_fkey" FOREIGN KEY ("responser_id") REFERENCES "trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_balances" ADD CONSTRAINT "user_balances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_balances" ADD CONSTRAINT "user_balances_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
