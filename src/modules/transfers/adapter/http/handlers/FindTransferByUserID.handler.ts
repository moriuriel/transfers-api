import { SuccessReponseBuilder } from '@adapter/api/response/success'
import { UUID } from '@adapter/providers/id'
import { AppError } from '@infrastructure/http/errors'
import { IFindTransferByUserIDOutput } from '@modules/transfers/domain/usecase'
import { FindTransferByUserIDUsecase } from '@modules/transfers/usecase/FindTransferByUserID.usecase'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export class FindTransferByUserIDHandler {
  private readonly usecase: FindTransferByUserIDUsecase

  constructor(usecase: FindTransferByUserIDUsecase) {
    this.usecase = usecase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params
    const isValidUUID = new UUID().isValidUUID(user_id)

    if (!isValidUUID) {
      throw new AppError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Uuid is not valid',
      })
    }

    const output = await this.usecase.execute({ userID: user_id })

    const response = new SuccessReponseBuilder<
      IFindTransferByUserIDOutput[],
      null
    >()
      .setData(output)
      .setStatusCode(StatusCodes.OK)
      .build()

    return res.status(StatusCodes.OK).json(response)
  }
}
