import prisma from 'prisma/prisma'
import { ExerciseEntry } from '@prisma/client'

//get a list of exercise entries given a workoutId
export async function getExerciseEntries(id: string): Promise<ExerciseEntry[]> {
	try {
		const exerciseList = await prisma.exerciseEntry.findMany({
			where: {
				workoutId: id
			},
		})
		return exerciseList
	}
	catch(err) {
		console.error(err)
		return null
	}
}