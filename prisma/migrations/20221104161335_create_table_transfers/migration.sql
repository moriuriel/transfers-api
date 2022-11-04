-- CreateTable
CREATE TABLE "transfers" (
    "id" TEXT NOT NULL,
    "payer_id" TEXT,
    "payee_id" TEXT,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transfers_payer_id_key" ON "transfers"("payer_id");

-- CreateIndex
CREATE UNIQUE INDEX "transfers_payee_id_key" ON "transfers"("payee_id");

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_payer_id_fkey" FOREIGN KEY ("payer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_payee_id_fkey" FOREIGN KEY ("payee_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
