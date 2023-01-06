import { ExerciseEntry, WorkoutEntry } from '@prisma/client'
import prisma from 'prisma/prisma'

import { LastWorkoutEntry } from './getLastWorkoutOfType'
/**
 * return the
 * @param ID this is either the id of the workout or the workout type that we will use to get the last workout of that type
 * @returns 
 */
export async function getWorkoutEntry(ID: string, skip?: number, workoutType = false): Promise<LastWorkoutEntry | LastWorkoutEntry & { exercises: ExerciseEntry[] }> {
	try {
		const workout = workoutType ?
			await getWorkoutUsingType(ID, skip) :
			await getWorkoutUsingID(ID)

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
 * if we only have a workout type to use then go though all of the workout types , sort, then skip x numbers to get the last workout
 * @param workoutType 
 * @param skip 
 */
const getWorkoutUsingType = async (workoutType: string, skipAmount?: number): Promise<WorkoutEntry & { exercises: ExerciseEntry[] }> => {
	const workout = await prisma.workoutEntry.findFirst({
		where: {
			workoutTemplateId: workoutType
		},
		orderBy: { date: 'desc' },
		skip: skipAmount,
		include: {
			exercises: true
		}
	})
	return workout
}

/**
 * if we already know the workout Id that we want to get just get the data and return it
 * @param workoutID the id of the workout we want to get
 * @returns 
 */
const getWorkoutUsingID = async (workoutID: string): Promise<WorkoutEntry> => {
	const workout = await prisma.workoutEntry.findFirst({
		where: {
			id: workoutID
		}
	})
	return workout
}