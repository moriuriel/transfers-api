import { SuccessReponseBuilder } from '@adapter/api/response/success'
import {
  ICreateTransferInput,
  ICreateTransferOutput,
} from '@modules/transfers/domain/usecase'
import { CreateTransferUsecase } from '@modules/transfers/usecase/CreateTransfer.usecase'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export class CreateTransferHandler {
  private readonly usecase: CreateTransferUsecase

  constructor(usecase: CreateTransferUsecase) {
    this.usecase = usecase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { amount, payee_id, payer_id } = req.body

    this.validateInput({ amount, payee_id, payer_id })

    const output = await this.usecase.execute({ amount, payee_id, payer_id })

    const response = new SuccessReponseBuilder<ICreateTransferOutput, null>()
      .setData(output)
      .setStatusCode(StatusCodes.CREATED)
      .build()

    return res.status(StatusCodes.CREATED).json(response)
  }

  private validateInput(input: ICreateTransferInput) {
    const inputUser = z.object({
      amount: z.number().min(0.01),
      payee_id: z.string().uuid(),
      payer_id: z.string().uuid(),
    })

    return inputUser.parse(input)
  }
}
