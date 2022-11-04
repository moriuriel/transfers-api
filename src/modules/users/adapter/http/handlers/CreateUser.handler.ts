import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateUserUsecase } from '@modules/users/usecase/CreateUser.usecase'
import { StatusCodes } from 'http-status-codes'
import {
  ICreateUserInput,
  ICreateUserOutput,
} from '@modules/users/domain/usecase'
import { SuccessReponseBuilder } from '@adapter/api/response/success'

export class CreateUserHandler {
  private usecase: CreateUserUsecase

  constructor(usecase: CreateUserUsecase) {
    this.usecase = usecase
  }
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, document, email, password, user_type, money } = req.body

    this.validateInput({
      name,
      document,
      email,
      password,
      user_type,
      money,
    })

    const output = await this.usecase.execute({
      name,
      document,
      email,
      password,
      user_type,
      money,
    })

    const response = new SuccessReponseBuilder<ICreateUserOutput, null>()
      .setData(output)
      .setStatusCode(StatusCodes.CREATED)
      .build()

    return res.status(StatusCodes.CREATED).json(response)
  }

  validateInput(input: ICreateUserInput) {
    const inputUser = z.object({
      name: z.string().min(3),
      document: z.string(),
      email: z.string().email(),
      password: z.string(),
      money: z.number().min(0.01),
      user_type: z.enum(['SHOPKEEPER', 'CLIENT']),
    })

    return inputUser.parse(input)
  }
}
