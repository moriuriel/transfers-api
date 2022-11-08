import { IWalletProps } from '@modules/users/domain'
import {
  IFindUserBalanceOutput,
  IFindUserBalancePresenter,
} from '@modules/users/domain/usecase'

export class FindUserBalancePresenter implements IFindUserBalancePresenter {
  output(wallet: IWalletProps): IFindUserBalanceOutput {
    return {
      balance: wallet.money,
    }
  }
}
