import * as dotenv from 'dotenv'
import { WinstonLog } from '@infrastructure/log/winston.log'
import express from 'express'
import 'express-async-errors'
import { exceptionFilter } from './errors'
import { router } from './routes'

dotenv.config()

const server = express()

server.use(express.json())
server.use(router)

const log = WinstonLog.newLogger()

server.use(exceptionFilter)

server.listen(parseInt(process.env.APP_PORT, 10), () => {
  log.info('Transfer is Running')
})
