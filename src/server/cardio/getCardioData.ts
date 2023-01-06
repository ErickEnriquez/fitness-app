import prisma from 'prisma/prisma'
import { SerializedCardio } from './cardio'
/**
 * Query the data base given a cardio Id, retrieve the info that pertains to it
 * @param cardioId 
 * @returns 
 */
export default async function getCardioData(cardioId: string): Promise<SerializedCardio> {
	const data = await prisma.cardio.findFirst({
		where: {
			id: cardioId
		}
	})

	if (!data) throw Error('Cardio Info not found')

	return { ...data, timeCreated: data.timeCreated.toISOString() }
}