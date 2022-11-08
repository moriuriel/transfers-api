import { canTransfer } from '@adapter/api/middleware'
import { AuthorizerTransfer } from '@adapter/http/AuthorizerTransfer'
import { CreateTransferUsecase } from '@modules/transfers/usecase/CreateTransfer.usecase'
import { FindTransferByUserIDUsecase } from '@modules/transfers/usecase/FindTransferByUserID.usecase'
import { UserRepository } from '@modules/users/adapter/repository'
import { WalletRepository } from '@modules/users/adapter/repository/Wallet.respository'
import { Request, Response, Router } from 'express'
import { CreateTransferPresenter } from '../../presenter/CreateTransfer.presenter'
import { FindTransferByUserIDPresenter } from '../../presenter/FindTransferByUserID.presenter'
import { TransferRepository } from '../../repository/Transfer.repository'
import { FindTransferByUserIDHandler } from '../handlers'
import { CreateTransferHandler } from '../handlers/CreateTransfer.handler'

const transferRouter = Router()

const userRepo = new UserRepository()
const walletRepo = new WalletRepository()
const transferRepo = new TransferRepository()
const createTransferPresenter = new CreateTransferPresenter()
const authorizerTransfer = new AuthorizerTransfer()

const createTransferUsecase = new CreateTransferUsecase(
  userRepo,
  transferRepo,
  createTransferPresenter,
  walletRepo,
  authorizerTransfer
)
const createTransferHanlder = new CreateTransferHandler(createTransferUsecase)
transferRouter.post('/', canTransfer(), (req: Request, res: Response) => {
  return createTransferHanlder.handle(req, res)
})

const findTransferByUserIDPresenter = new FindTransferByUserIDPresenter()

const findTransferByUserIDUsecase = new FindTransferByUserIDUsecase(
  transferRepo,
  findTransferByUserIDPresenter
)

const findTransferByUserIDHandler = new FindTransferByUserIDHandler(
  findTransferByUserIDUsecase
)
transferRouter.get('/:user_id', (req: Request, res: Response) => {
  return findTransferByUserIDHandler.handle(req, res)
})

export { transferRouter }
