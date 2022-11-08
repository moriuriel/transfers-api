import { IWalletProps } from '../Wallet'

export interface IFindUserBalanceInput {
  userID: string
}

export interface IFindUserBalanceOutput {
  balance: number
}

export interface IFindUserBalancePresenter {
  output(wallet: IWalletProps): IFindUserBalanceOutput
}

export interface IFindUserBalanceUsecase {
  execute(input: IFindUserBalanceInput): Promise<IFindUserBalanceOutput>
}
