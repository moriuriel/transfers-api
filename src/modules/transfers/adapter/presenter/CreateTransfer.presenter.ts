import {
  ICreateTransferOutput,
  ICreateTransferPresenter,
} from '@modules/transfers/domain/usecase'
import { IUserProps } from '@modules/users/domain'

export class CreateTransferPresenter implements ICreateTransferPresenter {
  output(
    id: string,
    payee: IUserProps,
    payer: IUserProps,
    amount: number,
    created_at: string
  ): ICreateTransferOutput {
    return {
      id,
      amount,
      created_at,
      payee_name: payee.name,
      payer_name: payer.name,
    }
  }
}
