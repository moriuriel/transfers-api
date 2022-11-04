import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AppError } from './AppError'

function exceptionFilter(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      statusCode: err.statusCode,
    })
  }

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    massage: err,
    code: StatusCodes.INTERNAL_SERVER_ERROR,
  })
}

export { exceptionFilter }
