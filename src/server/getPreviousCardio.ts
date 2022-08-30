
import prisma from 'prisma/prisma'
import { Cardio } from '@prisma/client'
/**
 * get all of the cardio's for given user between the given dates
 * @param startDate 
 * @param endDate 
 * @param userID 
 */

export interface PreviousCardio extends Omit<Cardio, 'timeCreated'> {
	timeCreated: string
}

export async function getPreviousCardio(startDate: string, endDate: string, userId: string): Promise<PreviousCardio[]> {
	try {
		const cardioList = await prisma.cardio.findMany({
			where: {
				AND: [
					{ userId },
					{
						timeCreated: {
							gte: startDate,
							lte: endDate
						}
					}
				]
			}
		})
		return cardioList.map(cardio => ({ ...cardio, timeCreated: cardio.timeCreated.toISOString() }))
	} catch (err) {
		console.error(err)
		throw Error(err)
	}
}