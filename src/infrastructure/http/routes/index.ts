import { userRouter } from '@modules/users/adapter/http/routes'
import express, { Request, Response } from 'express'

const router = express.Router()

router.get(
  '/health',
  async (_: Request, response: Response): Promise<Response> => {
    return response.status(200).json({ status: 'ok' })
  }
)

router.use('/users', userRouter)

export { router }
