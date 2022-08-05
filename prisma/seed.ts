import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	//write you seed data here

}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})