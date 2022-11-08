import { IUserProps, User, UserType } from '../User'
import { Wallet } from '../Wallet'

export interface ICreateUserInput {
  name: string
  document: string
  email: string
  password: string
  money: number
  user_type: UserType
}

export interface ICreateUserOutput extends IUserProps {
  money: number
}

export interface ICreateUserUsecase {
  execute(input: ICreateUserInput): Promise<ICreateUserOutput>
}

export interface ICreateUserPresenter {
  output(user: User, wallet: Wallet): ICreateUserOutput
}
