import { WorkoutEntry } from '@prisma/client'
import prisma from 'prisma/prisma'


/**
 * representation of a workout entry and serializing the date to a ISO string, (same as workoutEntry)
 * @property {string} date the date of the workout as a serialized string instead of as a Date object
 */
export interface PreviousWorkoutsEntry extends Omit<WorkoutEntry, 'date'> {
	date: string
}

/**
 * returns all of the workouts that have been created in a given date range
 * @param startDate the beginning date of the range we want to search
 * @param endDate the ending date of the range we want to search
 */
export async function getPreviousWorkouts(startDate: Date, endDate: Date): Promise<PreviousWorkoutsEntry[]> {
	try {

		const data = await prisma.workoutEntry.findMany({
			where: {
				date: {
					gte: startDate,
					lte: endDate
				}
			},
			orderBy: {
				date: 'desc'
			}
		})
		//serialize the date object to an ISO string to pass back to the front end
		return data.map(item => ({ ...item, date: item.date.toISOString() }))

	} catch (err) {
		console.error(err)
		throw Error('Unable to get previous workouts for calendar')
	}
}