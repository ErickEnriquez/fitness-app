
import prisma from 'prisma/prisma'
import { SerializedCardio } from './'
/** 
 * return a list of all of the cardio entries between 2 given date ranges
 */
export default async function getPreviousCardioInRange(startDate: string, endDate: string, userId: string): Promise<SerializedCardio[]> {
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