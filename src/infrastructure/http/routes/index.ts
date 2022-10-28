import express, { Request, Response } from 'express'

const router = express.Router()

router.get(
   '/health',
   async (_: Request, response: Response): Promise<Response> => {
      return response.status(200).json({ status: 'ok' })
   }
)

export { router }
