import { IUser, User } from '../User'

export interface IUserRepository {
  create(user: User): Promise<User>
  findByDocument(document: string): Promise<IUser>
  findByEmail(email: string): Promise<IUser>
}
