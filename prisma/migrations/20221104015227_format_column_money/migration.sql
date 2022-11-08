/*
  Warnings:

  - You are about to alter the column `money` on the `wallets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(2,0)`.

*/
-- AlterTable
ALTER TABLE "wallets" ALTER COLUMN "money" SET DATA TYPE DECIMAL(2,0);
