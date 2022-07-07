import prisma from 'prisma/prisma'
import { CardioState } from '@features/cardio/CardioSlice'
import { CardioType } from '@prisma/client'

export async function postCardio(val: CardioState): Promise<boolean> {
	try {
		await prisma.cardio.create({
			data: {
				intensity: val.intensity,
				caloriesBurned: val.caloriesBurned,
				distance: val.distance,
				time: val.time,
				notes: val.notes,
				type: CardioType[val.cardioType]
			}
		})
		return true
	}
	catch (err) {
		console.error(err)
		return false
	}
}