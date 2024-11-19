import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

type PrismaClientWithExtensions = ReturnType<typeof prismaClientWithExtensions>

const prismaClientWithExtensions = () => {
  return new PrismaClient().$extends(withAccelerate())
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientWithExtensions | undefined
}

let prisma: PrismaClientWithExtensions

if (process.env.NODE_ENV === 'production') {
  prisma = prismaClientWithExtensions()
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = prismaClientWithExtensions()
  }
  prisma = globalThis.prisma
}

export { prisma }
