export interface IUserProps {
  id: string
  name: string
  document: string
  email: string
  password: string
  can_transfer: boolean
  created_at: string | Date
}

export enum UserType {
  SHOPKEEPER = 'SHOPKEEPER',
  CLIENT = 'CLIENT',
}
export class User {
  public readonly user: IUserProps

  constructor(props: IUserProps) {
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

  createdAt(): string | Date {
    return this.user.created_at
  }
}
