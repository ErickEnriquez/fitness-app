import  prisma  from 'prisma/prisma'
import { WorkoutEntry } from '@prisma/client'

export interface LastWorkoutEntry extends Omit<WorkoutEntry, 'date'> { 
	date: string
}

export async function getLastWorkout(templateID: number): Promise<LastWorkoutEntry> { 
	try {
		const data = await prisma.workoutEntry.findFirst({
			where: {
				workoutTemplateId: templateID
			},
			orderBy: {
				date: 'desc'
			}
		})
		//serialize date to a string to send to front end
		return {...data, date: data.date.toISOString()}
	}
	catch (err) { 
		console.error(err)
		return null
	}
}