import { ITransfer, ITransferProps } from '@modules/transfers/domain'
import {
  IFindTransferByUserIDOutput,
  IFindTransferByUserIDPresenter,
} from '@modules/transfers/domain/usecase'

export class FindTransferByUserIDPresenter
  implements IFindTransferByUserIDPresenter
{
  output(transfers: ITransferProps[]): IFindTransferByUserIDOutput[] {
    const output: IFindTransferByUserIDOutput[] = []

    transfers.forEach((transfer) => {
      output.push({
        id: transfer.id,
        payer_id: transfer.payer_id,
        payee_id: transfer.payee_id,
        amount: Number(transfer.amount),
        created_at: new Date(transfer.created_at).toISOString(),
      })
    })

    return output
  }
}
