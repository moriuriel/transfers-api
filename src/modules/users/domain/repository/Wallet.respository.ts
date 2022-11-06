import { IWalletProps, Wallet } from '../Wallet'

export interface IWalletRepository {
  create(wallet: Wallet): Promise<Wallet>
  findByUserID(userID: string): Promise<IWalletProps>
  updateMoney(wallet: Wallet): Promise<void>
}
