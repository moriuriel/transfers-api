import { User, UserType } from '../User'

export interface ICreateUserInput {
  name: string
  document: string
  email: string
  password: string
  user_type: UserType
}

export type ICreateUserOutput = User

export interface ICreateUserUsecase {
  execute(input: ICreateUserInput): Promise<ICreateUserOutput>
}
