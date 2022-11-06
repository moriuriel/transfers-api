import { transferRouter } from '@modules/transfers/adapter/http/routes'
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
router.use('/transfers', transferRouter)

export { router }
