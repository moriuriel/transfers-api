import { prisma } from '@infrastructure/prisma/client'
import { IWalletRepository } from '@modules/users/domain/repository'
import { IWalletProps, Wallet } from '@modules/users/domain/Wallet'

export class WalletRepository implements IWalletRepository {
  async create(wallet: Wallet): Promise<Wallet> {
    await prisma.wallet.create({
      data: {
        id: wallet.id(),
        money: wallet.money(),
        user_id: wallet.userId(),
        created_at: wallet.createdAt(),
      },
    })

    return wallet
  }

  async findByUserID(userID: string): Promise<IWalletProps> {
    const rawWallet = await prisma.wallet.findFirst({
      where: { user_id: userID },
    })

    return {
      ...rawWallet,
      money: Number(rawWallet.money),
    }
  }

  async updateMoney(wallet: Wallet): Promise<void> {
    await prisma.wallet.update({
      where: {
        id: wallet.id(),
      },
      data: {
        money: wallet.money(),
      },
    })
  }
}
