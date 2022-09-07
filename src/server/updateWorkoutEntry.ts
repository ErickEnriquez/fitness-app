import { WorkoutEntry } from '@prisma/client'
import prisma from 'prisma/prisma'

/**
 * using prisma update the workout given and update the grade, pre-workout or the notes
 * @param workout 
 */
export async function updateWorkoutEntry(workout: WorkoutEntry) {
	try {
		await prisma.workoutEntry.update({
			where: {
				id: workout.id
			},
			data: {
				preWorkout: workout.preWorkout || false,
				grade: workout.grade || undefined,
				notes: workout.notes || undefined
			}
		})
	} catch (err) {
		console.error(err)
		throw Error(err)
	}
}