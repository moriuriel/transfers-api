import express from 'express'
import 'express-async-errors'
import { exceptionFilter } from './errors'
import { router } from './routes'

const server = express()

server.use(express.json())
server.use(router)

server.use(exceptionFilter)

server.listen(3001, () => {
  console.log('Transfer running!')
})
