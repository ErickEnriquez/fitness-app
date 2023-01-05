import { UserEntry } from '@features/exercise/ExerciseSlice'
import prisma from 'prisma/prisma'

/**
 * take all of the user entries that user has created and create new exerciseEntries with the newWorkoutId made for them
 */
export async function postExerciseEntries(entries: UserEntry[], id:number): Promise<void> {
	const t = await prisma.exerciseEntry.createMany({
		data: entries.map((entry: UserEntry) => {
			return ({
				notes: entry.notes || undefined,
				intensity: entry.intensity || undefined,
				order: entry.order || undefined,
				weights: entry.weights.map((weight: number) =>  weight || undefined),
				exerciseID: entry.id,
				workoutID: id
			})
		})
	})
		
	if (t.count !== entries.length) {
		throw Error('Unable to update all entries')
	}
	return
}