
import prisma from 'prisma/prisma'
import { Cardio } from '@prisma/client'
/**
 * get all of the cardio's for given user between the given dates
 * @param startDate 
 * @param endDate 
 * @param userID 
 */
export async function getPreviousCardio(startDate: string, endDate: string, userId: string): Promise<Cardio[]> {
	try {
		const cardio = await prisma.cardio.findMany({
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
		return cardio
	} catch (err) {
		console.error(err)
		throw Error(err)
	}
}