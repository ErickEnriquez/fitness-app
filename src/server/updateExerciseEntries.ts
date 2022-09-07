import { ExerciseEntry } from '@prisma/client'
import prisma from 'prisma/prisma'

/**
 * using prisma update all of the exercises provided with their new data
 * @param {ExerciseEntry[]} exercises, list of the exercises that we want to update
 */
export async function updateExerciseEntries(exercises: ExerciseEntry[]) {
	try {
		await Promise.all(exercises.map(e => (
			prisma.exerciseEntry.update({
				where: { id: e.id },
				data: {
					notes: e.notes || undefined,
					order: e.order || undefined,
					intensity: e.intensity || undefined,
					weights: e.weights || undefined
				}
			})
		)))
	} catch (err) {
		console.error(err)
		throw Error(err)
	}
}