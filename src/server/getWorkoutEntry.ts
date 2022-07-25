import prisma from 'prisma/prisma'

import { LastWorkoutEntry } from './getLastWorkoutOfType'
/**
 * return the
 * @param workoutID 
 * @returns 
 */
export async function getWorkoutEntry(workoutID: number): Promise<LastWorkoutEntry> {
	try {
		const workout = await prisma.workoutEntry.findFirst({
			where: {
				id: workoutID
			}
		})
		return workout ?
			{ ...workout, date: workout.date.toISOString() }
			: null
	}
	catch (err) {
		console.error(err)
		return null
	}
}