import prisma from 'prisma/prisma'
import { Movement } from '@prisma/client'

export async function getMovement(ID: string): Promise<Movement> {
	try {
		const data = await prisma.movement.findFirst({
			where: {
				id: ID
			}
		})
		return data
	}
	catch (err) {
		console.error(err)
		throw Error(err)
	}
}