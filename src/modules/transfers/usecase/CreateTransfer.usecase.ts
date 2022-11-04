import { UUID } from '@domain/Uuid'
import { AppError } from '@infrastructure/http/errors'
import { Wallet } from '@modules/users/domain'
import {
  IUserRepository,
  IWalletRepository,
} from '@modules/users/domain/repository'
import { StatusCodes } from 'http-status-codes'
import { Transfer } from '../domain'
import { ITransferRepository } from '../domain/repository/Transfer.repository'
import {
  ICreateTransferInput,
  ICreateTransferOutput,
  ICreateTransferPresenter,
  ICreateTransferUsecase,
} from '../domain/usecase'

export class CreateTransferUsecase implements ICreateTransferUsecase {
  private readonly userRepo: IUserRepository
  private readonly transferRepo: ITransferRepository
  private readonly presenter: ICreateTransferPresenter
  private readonly walletRepo: IWalletRepository

  constructor(
    userRepo: IUserRepository,
    transferRepo: ITransferRepository,
    presenter: ICreateTransferPresenter,
    walletRepo: IWalletRepository
  ) {
    this.userRepo = userRepo
    this.presenter = presenter
    this.transferRepo = transferRepo
    this.walletRepo = walletRepo
  }

  async execute(input: ICreateTransferInput): Promise<ICreateTransferOutput> {
    const payer = await this.userRepo.finByID(input.payer_id)
    if (!!payer) {
      throw new AppError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Payer not found',
      })
    }

    const rawPayerWallet = await this.walletRepo.findByUserID(payer.id)
    if (!!rawPayerWallet) {
      throw new AppError({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Wallet not found for Payer',
      })
    }

    const payerWallet = new Wallet({
      id: rawPayerWallet.id,
      user_id: rawPayerWallet.user_id,
      money: rawPayerWallet.money,
      created_at: rawPayerWallet.created_at,
    })

    payerWallet.withdraw(input.amount)

    await this.walletRepo.updateMoney(payerWallet)

    const payee = await this.userRepo.finByID(input.payee_id)
    if (!!payee) {
      throw new AppError({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Payee not found',
      })
    }

    const rawPayeeWallet = await this.walletRepo.findByUserID(payer.id)
    if (!!rawPayerWallet) {
      throw new AppError({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Wallet not found for Payer',
      })
    }

    const payeeWallet = new Wallet({
      id: rawPayeeWallet.id,
      user_id: rawPayeeWallet.user_id,
      money: rawPayeeWallet.money,
      created_at: rawPayeeWallet.created_at,
    })

    payeeWallet.deposit(input.amount)

    await this.walletRepo.updateMoney(payeeWallet)

    const transfer = new Transfer({
      id: new UUID().newUUID(),
      payee_id: input.payee_id,
      payer_id: input.payer_id,
      amount: input.amount,
      created_at: new Date(Date.now()).toISOString(),
    })

    await this.transferRepo.create(transfer)

    return this.presenter.output(
      transfer.id(),
      payee,
      payer,
      transfer.amount(),
      transfer.createdAt()
    )
  }
}
