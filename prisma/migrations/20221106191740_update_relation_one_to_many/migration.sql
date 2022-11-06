/*
  Warnings:

  - Made the column `payer_id` on table `transfers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `payee_id` on table `transfers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "transfers" DROP CONSTRAINT "transfers_payee_id_fkey";

-- DropForeignKey
ALTER TABLE "transfers" DROP CONSTRAINT "transfers_payer_id_fkey";

-- DropIndex
DROP INDEX "transfers_payee_id_key";

-- DropIndex
DROP INDEX "transfers_payer_id_key";

-- AlterTable
ALTER TABLE "transfers" ALTER COLUMN "payer_id" SET NOT NULL,
ALTER COLUMN "payee_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_payer_id_fkey" FOREIGN KEY ("payer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_payee_id_fkey" FOREIGN KEY ("payee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
