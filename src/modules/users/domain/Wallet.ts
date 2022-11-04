export interface IWalletProps {
  id: string
  money: number
  user_id: string
  created_at: string
}

export interface IWallet {
  id(): string
  money(): number
  createdAt(): string
  deposit(amount: number)
  withdraw(amount: number)
  fixed(money: number): number
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
  createdAt(): string {
    return this.wallet.created_at
  }

  fixed(money: number): number {
    return (money * 100) / 100
  }

  deposit(amount: number) {
    this.wallet.money += amount
  }

  withdraw(amount: number) {
    if (amount > this.wallet.money) {
      throw new Error('not enough balance')
    }
    this.wallet.money -= amount
  }
}
