import { prisma } from '@infrastructure/prisma/client'
import { Transfer, ITransferProps } from '@modules/transfers/domain'
import { ITransferRepository } from '@modules/transfers/domain/repository/Transfer.repository'

export class TransferRepository implements ITransferRepository {
  async create(transfer: Transfer): Promise<Transfer> {
    await prisma.transfers.create({
      data: {
        id: transfer.id(),
        payee_id: transfer.payeeId(),
        payer_id: transfer.payerId(),
        amount: transfer.amount(),
        created_at: transfer.createdAt(),
      },
    })

    return transfer
  }

  async findByUserID(userID: string): Promise<ITransferProps[]> {
    const transfers = await prisma.transfers.findMany({
      where: {
        payee_id: userID,
        OR: {
          payee_id: userID,
        },
      },
    })

    return transfers
  }
}
