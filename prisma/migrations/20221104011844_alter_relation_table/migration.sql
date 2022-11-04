/*
  Warnings:

  - You are about to drop the column `wallet_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `wallets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_wallet_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "wallet_id";

-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "wallets_user_id_key" ON "wallets"("user_id");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
