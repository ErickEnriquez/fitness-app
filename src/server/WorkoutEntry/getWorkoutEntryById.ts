import prisma from 'prisma/prisma'
import {  SerializedWorkoutEntry } from './workoutEntry'

/**
 * if we already know the workout Id that we want to get just get the data and return it
 * @param workoutID the id of the workout we want to get
 * @returns 
 */
export const getWorkoutEntryById = async (workoutID: string): Promise<SerializedWorkoutEntry> => {
	const workout = await prisma.workoutEntry.findFirst({
		where: {
			id: workoutID
		},
	})
	
	if (!workout) {
		throw Error('No Previous workout found')
	}

	return {...workout, date:workout.date.toISOString()}
}