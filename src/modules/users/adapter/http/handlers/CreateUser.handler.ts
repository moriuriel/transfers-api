import { CreateUserUsecase } from '@modules/users/usecase/CreateUser.usecase'
import { Request, Response } from 'express'

export class CreateUserHandler {
  private usecase: CreateUserUsecase

  constructor(usecase: CreateUserUsecase) {
    this.usecase = usecase
  }
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, document, email, password, user_type } = req.body
    const output = await this.usecase.execute({
      name,
      document,
      email,
      password,
      user_type,
    })

    return res.status(201).json(output)
  }
}
