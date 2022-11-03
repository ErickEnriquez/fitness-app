import prisma from 'prisma/prisma'
import { Workout } from '@prisma/client'

/**
 * Given a programID return all of the workouts that belong to that workout
 * @param programId 
 * @returns 
 */
export async function getWorkoutTemplate(programId: number): Promise<Workout[]> {
	const workouts = await prisma.workout.findMany({
		where: {
			programID: programId
		}
	})
	if (!workouts) throw Error('Unable to get workout templates')
	return workouts
}