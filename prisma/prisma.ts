
/* eslint-disable @typescript-eslint/no-namespace */
// lib/prisma.ts
declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}
	prisma = global.prisma
}
