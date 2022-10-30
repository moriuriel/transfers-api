import { CreateUserUsecase } from '@modules/users/usecase'
import { Router } from 'express'
import { UserRepository } from '../../repository/User.repository'
import { CreateUserHandler } from '../handlers'

const userRouter = Router()

const userRepo = new UserRepository()
const createUserusecase = new CreateUserUsecase(userRepo)

const createUserHandler = new CreateUserHandler(createUserusecase)

userRouter.post('/', createUserHandler.handle)

export { userRouter }
