export interface IUser {
  id: string
  name: string
  document: string
  email: string
  password: string
  can_transfer: boolean
  wallet_id: string
  created_at: string
}

export enum UserType {
  SHOPKEEPER = 'SHOPKEEPER',
  CLIENT = 'CLIENT',
}
export class User {
  public readonly user: IUser

  constructor(props: IUser) {
    this.user = props
  }

  id(): string {
    return this.user.id
  }

  name(): string {
    return this.user.name
  }

  document(): string {
    return this.user.document
  }

  email(): string {
    return this.user.email
  }

  password(): string {
    return this.user.password
  }

  canTransfer(): boolean {
    return this.user.can_transfer
  }

  walletID(): string {
    return this.user.wallet_id
  }

  createdAt(): string {
    return this.user.created_at
  }
}
