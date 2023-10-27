-- CreateTable
CREATE TABLE "refresh_token" (
    "id" UUID NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_id_key" ON "refresh_token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_email_key" ON "refresh_token"("email");
