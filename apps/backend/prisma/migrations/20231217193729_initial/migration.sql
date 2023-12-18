-- CreateTable
CREATE TABLE "cooperative_training_requests" (
    "id" UUID NOT NULL,
    "requester_id" UUID NOT NULL,
    "responser_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "status_changed_at" TIMESTAMPTZ NOT NULL,
    "status" VARCHAR(64) NOT NULL,

    CONSTRAINT "cooperative_training_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cooperative_training_requests_id_key" ON "cooperative_training_requests"("id");
