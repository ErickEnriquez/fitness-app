import prisma from 'prisma/prisma'
import { ExerciseTemplateTemplateWithName } from './exerciseTemplate'

export async function getExerciseTemplates(workoutID: number): Promise<ExerciseTemplateTemplateWithName[]> {
	const data = await prisma.exerciseTemplate.findMany({
		where: {
			workoutId: workoutID
		},
		include: {
			movement:true
		}
	})
	return data
}