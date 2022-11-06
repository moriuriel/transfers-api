import { AppError } from '@infrastructure/http/errors'
import { UserRepository } from '@modules/users/adapter/repository'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

function canTransfer() {
  return async (request: Request, _: Response, next: NextFunction) => {
    const { payer_id } = request.body

    const user = await new UserRepository().finByID(payer_id)

    if (!user) {
      throw new AppError({
        message: 'User not found',
        statusCode: StatusCodes.UNAUTHORIZED,
      })
    }
    const userCanTransfer = user.can_transfer

    if (!userCanTransfer) {
      throw new AppError({
        message: 'User cannot perform the transaction',
        statusCode: StatusCodes.UNAUTHORIZED,
      })
    }

    return next()
  }
}

export { canTransfer }
