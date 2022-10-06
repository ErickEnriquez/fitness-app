import { Cardio } from '@prisma/client'
import prisma from 'prisma/prisma'

/**
 * given a cardio Id delete the cardio in question and return the record on success
 */
export default async function deleteCardioEntry(id: number): Promise<Cardio> {
	const success = await prisma.cardio.delete({
		where: { id }
	})

	if (!success) throw Error('Unable to delete cardio')

	return success
}