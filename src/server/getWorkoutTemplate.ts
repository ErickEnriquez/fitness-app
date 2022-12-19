import prisma from 'prisma/prisma'
import { WorkoutTemplate } from '@prisma/client'

/**
 * Given a programID return all of the workouts that belong to that workout
 * @param programId 
 * @returns 
 */
export async function getWorkoutTemplate(programId: string): Promise<WorkoutTemplate[]> {
	try {
		const workoutArray = await prisma.workoutTemplate.findMany({
			where: {
				programId: programId
			}
		})
		return workoutArray
	}
	catch (err) {
		console.error(err)
		throw Error('Unable to get workout templates')
	}
}