import prisma from 'prisma/prisma'
import { activeWorkoutInfo } from '@features/exercise/exerciseSlice'
export  async function createWorkoutEntry(entry: activeWorkoutInfo): Promise<number | boolean> { 
	try {
		const workoutEntry = await prisma.workoutEntry.create({
			data: {
				workoutTemplateId: entry.workoutTemplateId,
				notes: entry.notes || undefined,
				grade: entry.grade || undefined,
				preWorkout: entry.preWorkout || false,
				date: new Date()
			}
		})
		return workoutEntry.id
	} catch (error) { 
		console.error(error)
		return false
	}
}