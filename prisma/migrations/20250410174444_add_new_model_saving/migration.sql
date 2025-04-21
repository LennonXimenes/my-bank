-- CreateTable
CREATE TABLE "Saving" (
    "id" UUID NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL,
    "interest_rate" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "account_id" UUID NOT NULL,

    CONSTRAINT "Saving_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Saving_account_id_key" ON "Saving"("account_id");

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
