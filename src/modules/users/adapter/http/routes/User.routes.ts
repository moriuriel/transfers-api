import { CreateUserUsecase } from '@modules/users/usecase'
import { Request, Response, Router } from 'express'
import { UserRepository } from '../../repository/User.repository'
import { WalletRepository } from '../../repository/Wallet.respository'
import { CreateUserHandler } from '../handlers'

const userRouter = Router()

const userRepo = new UserRepository()
const walletRepo = new WalletRepository()

const createUserusecase = new CreateUserUsecase(userRepo, walletRepo)

const createUserHandler = new CreateUserHandler(createUserusecase)

userRouter.post('/', (req: Request, res: Response) => {
  return createUserHandler.handle(req, res)
})

export { userRouter }
