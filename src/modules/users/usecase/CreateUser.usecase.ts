import { UUID } from 'src/domain/Uuid'
import { IUser, User } from '../domain'
import { ICreateUserInput, ICreateUserUsecase } from '../domain/usecase'

export class CreateUserUsecase implements ICreateUserUsecase {
  async execute(input: ICreateUserInput): Promise<User> {
    const userID = new UUID().newUUID()

    const user = new User({
      id: userID,
      name: input.name,
      email: input.email,
      document: input.document,
      created_at: new Date(Date.now()).toISOString(),
      password: input.password,
      can_transfer: true,
    })

    return user
  }
}
