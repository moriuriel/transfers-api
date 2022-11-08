import BCrptyHashProvider from '@adapter/providers/hash/BCrptyHashProvider.provider'
import {
  CreateUserUsecase,
  FindUserBalanceUsecase,
} from '@modules/users/usecase'
import { Request, Response, Router } from 'express'
import { CreateUserPresenter, FindUserBalancePresenter } from '../../presenter'
import { UserRepository, WalletRepository } from '../../repository'
import { CreateUserHandler, FindUserBalanceHandler } from '../handlers'

const userRouter = Router()

const userRepo = new UserRepository()
const walletRepo = new WalletRepository()
const createUserPresenter = new CreateUserPresenter()
const hashProvider = new BCrptyHashProvider()

const createUserUsecase = new CreateUserUsecase(
  userRepo,
  walletRepo,
  createUserPresenter,
  hashProvider
)
const createUserHandler = new CreateUserHandler(createUserUsecase)
userRouter.post('/', (req: Request, res: Response) => {
  return createUserHandler.handle(req, res)
})

const findUserBalancePresenter = new FindUserBalancePresenter()
const findUserBalanceUsecase = new FindUserBalanceUsecase(
  findUserBalancePresenter,
  walletRepo
)
const findUserBalanceHandler = new FindUserBalanceHandler(
  findUserBalanceUsecase
)
userRouter.get('/balance/:user_id', (req: Request, res: Response) => {
  return findUserBalanceHandler.handle(req, res)
})

export { userRouter }
