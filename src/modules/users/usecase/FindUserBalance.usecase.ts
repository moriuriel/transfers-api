import { AppError } from '@infrastructure/http/errors'
import { StatusCodes } from 'http-status-codes'
import { IWalletRepository } from '../domain/repository'
import {
  IFindUserBalanceInput,
  IFindUserBalanceOutput,
  IFindUserBalancePresenter,
  IFindUserBalanceUsecase,
} from '../domain/usecase'

export class FindUserBalanceUsecase implements IFindUserBalanceUsecase {
  private readonly presenter: IFindUserBalancePresenter
  private readonly walletRepo: IWalletRepository

  constructor(
    presenter: IFindUserBalancePresenter,
    walletRepo: IWalletRepository
  ) {
    ;(this.presenter = presenter), (this.walletRepo = walletRepo)
  }
  async execute(input: IFindUserBalanceInput): Promise<IFindUserBalanceOutput> {
    const wallet = await this.walletRepo.findByUserID(input.userID)
    if (!wallet) {
      throw new AppError({
        message: 'Wallet not found',
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      })
    }

    return this.presenter.output(wallet)
  }
}
