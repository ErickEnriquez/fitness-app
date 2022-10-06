import prisma from 'prisma/prisma'
import { Cardio } from '@prisma/client'

/**
 * Query the data base given a cardio Id, retrieve the info that pertains to it
 * @param cardioId 
 * @returns 
 */
export async function getCardioData(cardioId: number): Promise<Cardio> {
	const data = await prisma.cardio.findFirst({
		where: {
			id: cardioId
		}
	})

	if (!data) throw Error('Cardio Info not found')

	return data
}