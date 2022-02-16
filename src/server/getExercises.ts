import prisma from 'prisma/prisma'
import { ExerciseTemplate } from '@prisma/client'

export async function getExercises(workoutID: number): Promise<ExerciseTemplate[]> {
	const data = await prisma.exerciseTemplate.findMany({
		where: {
			workoutId: workoutID
		}
	})
	return data
}