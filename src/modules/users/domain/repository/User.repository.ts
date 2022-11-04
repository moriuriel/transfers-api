import { IUserProps, User } from '../User'

export interface IUserRepository {
  create(user: User): Promise<User>
  findByDocument(document: string): Promise<IUserProps>
  findByEmail(email: string): Promise<IUserProps>
}
