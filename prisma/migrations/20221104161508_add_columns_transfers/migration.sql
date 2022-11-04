/*
  Warnings:

  - Added the required column `amount` to the `transfers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `transfers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transfers" ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;
