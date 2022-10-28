import { User } from '../User'

export interface ICreateUserInput {
  name: string
  document: string
  email: string
  password: string
}

export type ICreateUserOutput = User

export interface ICreateUserUsecase {
  execute(input: ICreateUserInput): Promise<ICreateUserOutput>
}
