import { prisma } from '@infrastructure/prisma/client'
import { Transfer, ITransfer } from '@modules/transfers/domain'
import { ITransferRepository } from '@modules/transfers/domain/repository/Transfer.repository'

export class TransferRepository implements ITransferRepository {
  async create(transfer: Transfer): Promise<ITransfer> {
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
}
