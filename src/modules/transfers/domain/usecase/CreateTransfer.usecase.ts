import { IUserProps, User } from '@modules/users/domain'

export interface ICreateTransferInput {
  payee_id: string
  payer_id: string
  amount: number
}

export interface ICreateTransferOutput {
  id: string
  payee_name: string
  payer_name: string
  amount: number
  created_at: string
}

export interface ICreateTransferUsecase {
  execute(input: ICreateTransferInput): Promise<ICreateTransferOutput>
}

export interface ICreateTransferPresenter {
  output(
    id: string,
    payee: IUserProps,
    payer: IUserProps,
    amount: number,
    created_at: string
  ): ICreateTransferOutput
}
