import { ITransferProps } from '../Transfer'

export interface IFindTransferByUserIDInput {
  userID: string
}

export interface IFindTransferByUserIDOutput {
  id: string
  payee_id: string
  payer_id: string
  amount: number
  created_at: string
}

export interface IFindTransferByUserIDUsecase {
  execute(
    input: IFindTransferByUserIDInput
  ): Promise<IFindTransferByUserIDOutput[]>
}

export interface IFindTransferByUserIDPresenter {
  output(transfers: ITransferProps[]): IFindTransferByUserIDOutput[]
}
