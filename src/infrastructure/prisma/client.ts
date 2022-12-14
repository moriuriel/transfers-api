import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
   log: ['warn', 'info', 'query'],
})

export { prisma }
