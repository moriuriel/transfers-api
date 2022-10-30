import { UUID } from '@domain/Uuid'
import { User, UserType, Wallet } from '../domain'
import { IUserRepository, IWalletRepository } from '../domain/repository'
import { ICreateUserInput, ICreateUserUsecase } from '../domain/usecase'

export class CreateUserUsecase implements ICreateUserUsecase {
  private readonly userRepo: IUserRepository
  private readonly walletRepo: IWalletRepository

  constructor(userRepo: IUserRepository, walletRepo: IWalletRepository) {
    this.userRepo = userRepo
    this.walletRepo = walletRepo
  }

  async execute(input: ICreateUserInput): Promise<User> {
    const userCanTransfer = UserType[input.user_type] === UserType.CLIENT

    const wallet = new Wallet({
      id: new UUID().newUUID(),
      created_at: new Date(Date.now()).toISOString(),
      money: 0,
    })

    await this.walletRepo.create(wallet)

    const user = new User({
      id: new UUID().newUUID(),
      name: input.name,
      email: input.email,
      document: input.document,
      created_at: new Date(Date.now()).toISOString(),
      password: input.password,
      can_transfer: userCanTransfer,
      wallet_id: wallet.id(),
    })

    await this.userRepo.create(user)

    return user
  }
}
