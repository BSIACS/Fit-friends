/*
  Warnings:

  - You are about to drop the `refresh_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "refresh_token" DROP CONSTRAINT "refresh_token_user_id_fkey";

-- DropTable
DROP TABLE "refresh_token";

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_id_key" ON "refresh_tokens"("id");
