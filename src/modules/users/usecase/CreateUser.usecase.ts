import { UUID } from '@adapter/providers/id'
import IHashProvider from '@domain/providers/Hash'
import { AppError } from '@infrastructure/http/errors'
import { StatusCodes } from 'http-status-codes'
import { User, UserType, Wallet } from '../domain'
import { IUserRepository, IWalletRepository } from '../domain/repository'
import {
  ICreateUserInput,
  ICreateUserOutput,
  ICreateUserPresenter,
  ICreateUserUsecase,
} from '../domain/usecase'

export class CreateUserUsecase implements ICreateUserUsecase {
  private readonly userRepo: IUserRepository
  private readonly walletRepo: IWalletRepository
  private readonly presenter: ICreateUserPresenter
  private readonly hashProvider: IHashProvider

  constructor(
    userRepo: IUserRepository,
    walletRepo: IWalletRepository,
    presenter: ICreateUserPresenter,
    hashProvider: IHashProvider
  ) {
    this.userRepo = userRepo
    this.walletRepo = walletRepo
    this.presenter = presenter
    this.hashProvider = hashProvider
  }

  async execute(input: ICreateUserInput): Promise<ICreateUserOutput> {
    const userCanTransfer = UserType[input.user_type] === UserType.CLIENT

    const isDocumentInUse = await this.userRepo.findByDocument(input.document)

    if (isDocumentInUse) {
      throw new AppError({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Document in use',
      })
    }

    const isEmailInUse = await this.userRepo.findByEmail(input.email)

    if (isEmailInUse) {
      throw new AppError({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Email in use',
      })
    }

    const hashedPassword = await this.hashProvider.generateHash(input.password)

    const user = new User({
      id: new UUID().newUUID(),
      name: input.name,
      email: input.email,
      document: input.document,
      created_at: new Date(Date.now()).toISOString(),
      password: hashedPassword,
      can_transfer: userCanTransfer,
    })
    await this.userRepo.create(user)

    const wallet = new Wallet({
      id: new UUID().newUUID(),
      created_at: new Date(Date.now()).toISOString(),
      money: input.money,
      user_id: user.id(),
    })

    await this.walletRepo.create(wallet)

    return this.presenter.output(user, wallet)
  }
}
