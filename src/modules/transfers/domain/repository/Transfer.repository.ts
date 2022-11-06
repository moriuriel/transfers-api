import { ITransfer, Transfer } from '../Transfer'

export interface ITransferRepository {
  create(transfer: Transfer): Promise<ITransfer>
}
