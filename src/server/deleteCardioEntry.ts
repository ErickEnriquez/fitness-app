import { Cardio } from '@prisma/client'
import prisma from 'prisma/prisma'

export async function deleteCardioEntry(id: number): Promise<Cardio> {
	const success = await prisma.cardio.delete({
		where: { id }
	})

	if (!success) throw Error('Unable to delete cardio')

	return success

}