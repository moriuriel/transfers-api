import { AppError } from '@infrastructure/http/errors'
import { StatusCodes } from 'http-status-codes'

export interface IWalletProps {
  id: string
  money: number
  user_id: string
  created_at: string | Date
}

export interface IWallet {
  id(): string
  money(): number
  createdAt(): string | Date
  deposit(amount: number)
  withdraw(amount: number)
}

export class Wallet implements IWallet {
  private wallet: IWalletProps

  constructor(props: IWalletProps) {
    this.wallet = props
  }

  id(): string {
    return this.wallet.id
  }

  userId(): string {
    return this.wallet.user_id
  }

  money(): number {
    return this.wallet.money
  }

  createdAt(): string | Date {
    return this.wallet.created_at
  }

  deposit(amount: number): void {
    this.wallet.money += amount
  }

  withdraw(amount: number): void {
    if (amount > this.wallet.money) {
      throw new AppError({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'not enough balance',
      })
    }
    this.wallet.money -= amount
  }
}
