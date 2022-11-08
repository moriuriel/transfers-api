import { ITransferProps, Transfer } from '../Transfer'

export interface ITransferRepository {
  create(transfer: Transfer): Promise<Transfer>
  findByUserID(userID: string): Promise<ITransferProps[]>
}
