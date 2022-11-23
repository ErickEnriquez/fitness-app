import prisma from 'prisma/prisma'

import { WorkoutEntryWithExercises } from './workoutEntry'
/**
 * if we only have a workout type to use then go though all of the workout types , sort, then skip x numbers to get the last workout
 * @param workoutType 
 * @param skipAmount 
 */
export const getWorkoutEntryByType = async (workoutType: number, skipAmount?: number): Promise<WorkoutEntryWithExercises> => {
	const workout = await prisma.workoutEntry.findFirst({
		where: {
			workoutTemplateId: workoutType
		},
		orderBy: { date: 'desc' },
		skip: skipAmount,
		include: {
			exercises:true
		}
	})
	if (!workout) throw Error('no workout entry data found')

	return { ...workout, date: workout.date.toISOString() }
}
