import prisma from 'prisma/prisma'
import { activeWorkoutInfo } from '@features/exercise/ExerciseSlice'
/**create a new workout entry in the workout entries table and return the Id number associated with it */
export async function createWorkoutEntry(entry: activeWorkoutInfo): Promise<number> { 
	const {id} = await prisma.workoutEntry.create({
		data: {
			workoutTemplateId: entry.workoutTemplateId,
			notes: entry.notes || undefined,
			grade: entry.grade || undefined,
			preWorkout: entry.preWorkout || false,
			date: new Date()
		}
	})
	
	if (!id) {
		throw Error('unable to create new workout entry')
	}

	return id
}