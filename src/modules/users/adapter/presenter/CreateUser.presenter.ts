import { User, Wallet } from '@modules/users/domain'
import {
  ICreateUserOutput,
  ICreateUserPresenter,
} from '@modules/users/domain/usecase'

export class CreateUserPresenter implements ICreateUserPresenter {
  output(user: User, wallet: Wallet): ICreateUserOutput {
    return {
      id: user.id(),
      name: user.name(),
      document: user.document(),
      email: user.email(),
      password: user.password(),
      can_transfer: user.canTransfer(),
      created_at: user.createdAt(),
      money: wallet.money(),
    }
  }
}
