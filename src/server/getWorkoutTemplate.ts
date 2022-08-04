import prisma from 'prisma/prisma'
import { Workout } from '@prisma/client'

/**
 * Given a programID return all of the workouts that belong to that workout
 * @param programId 
 * @returns 
 */
export async function getWorkoutTemplate(programId: number): Promise<Workout[]> {
	try {
		const workoutArray = await prisma.workout.findMany({
			where: {
				programID: programId
			}
		})
		return workoutArray
	}
	catch (err) {
		console.error(err)
		throw Error('Unable to get workout templates')
	}
}