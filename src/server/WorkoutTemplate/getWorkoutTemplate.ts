import prisma from 'prisma/prisma'
import { WorkoutTemplate } from '@prisma/client'

/**
 * Given a programID return all of the workouts that belong to that workout
 * @param programId 
 * @returns 
 */
<<<<<<< HEAD:src/server/getWorkoutTemplate.ts
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
=======
export async function getWorkoutTemplate(programId: number): Promise<Workout[]> {
	const workouts = await prisma.workout.findMany({
		where: {
			programID: programId
		}
	})
	if (!workouts) throw Error('Unable to get workout templates')
	return workouts
>>>>>>> 6c59c7039e58ac1cfe512608630b842e54ec550c:src/server/WorkoutTemplate/getWorkoutTemplate.ts
}