import prisma from 'prisma/prisma'
import { Cardio } from '@prisma/client'
import { CardioType } from '@prisma/client'

/**
 * update the selected cardio data in the DB and return the updated copy on success
 */
export default async function updateCardio(data: Cardio): Promise<Cardio> {
	const updatedData = await prisma.cardio.update({
		where: {
			id: data.id
		},
		data: {
			intensity: data.intensity,
			time: data.time,
			distance: data.distance,
			caloriesBurned: data.caloriesBurned,
			notes: data.notes,
			type: CardioType[data.type]
		}
	})

	if (!updatedData) throw Error('Error while trying to update cardio')

	return updatedData
}