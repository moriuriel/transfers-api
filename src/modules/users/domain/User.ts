export interface IUser {
  id: string
  name: string
  document: string
  email: string
  password: string
  can_transfer: Boolean
  created_at: string
}

export class User {
  public readonly user: IUser

  constructor(props: IUser) {
    this.user = props
  }
}
