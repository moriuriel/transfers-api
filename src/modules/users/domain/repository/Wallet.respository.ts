import { Wallet } from '../Wallet'

export interface IWalletRepository {
  create(wallet: Wallet): Promise<Wallet>
}
