
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

/** 
 * return a list of all of the cardio entries between 2 given date ranges
 */
export default async function getPreviousCardioInRange(startDate: string, endDate: string, userId: string): Promise<PreviousCardio[]> {
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