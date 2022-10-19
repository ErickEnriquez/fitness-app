import { ExerciseEntry, WorkoutEntry } from '@prisma/client'
import prisma from 'prisma/prisma'

import { LastWorkoutEntry } from '../getLastWorkoutOfType'
/**
 * return the
 * @param ID this is either the id of the workout or the workout type that we will use to get the last workout of that type
 * @returns 
 */
export async function getWorkoutEntry(ID: number, skip?: number, workoutType = false): Promise<LastWorkoutEntry | LastWorkoutEntry & { exercises: ExerciseEntry[] }> {
	try {
		const workout = await getWorkoutUsingID(ID)

		return workout ?
			{ ...workout, date: workout.date.toISOString() }
			: null
	}
	catch (err) {
		console.error(err)
		throw Error ('unable to get workout')
	}
}


/**
 * if we already know the workout Id that we want to get just get the data and return it
 * @param workoutID the id of the workout we want to get
 * @returns 
 */
export const getWorkoutUsingID = async (workoutID: number): Promise<WorkoutEntry> => {
	const workout = await prisma.workoutEntry.findFirst({
		where: {
			id: workoutID
		}
	})
	return workout
}