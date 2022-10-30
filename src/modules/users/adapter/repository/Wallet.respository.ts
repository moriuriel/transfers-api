import { prisma } from '@infrastructure/prisma/client'
import { IWalletRepository } from '@modules/users/domain/repository'
import { Wallet } from '@modules/users/domain/Wallet'

export class WalletRepository implements IWalletRepository {
  async create(wallet: Wallet): Promise<Wallet> {
    await prisma.wallet.create({
      data: {
        id: wallet.id(),
        money: wallet.money(),
        created_at: wallet.createdAt(),
      },
    })

    return wallet
  }
}
