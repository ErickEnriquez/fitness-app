/* eslint-disable indent */
import { NextApiRequest, NextApiResponse } from 'next'
import { getPreviousWorkouts } from '@server/getPreviousWorkouts'
import { deleteWorkoutEntry } from '@server/deleteWorkoutEntry'
import { updateWorkoutEntry } from '@server/updateWorkoutEntry'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'
import { WorkoutEntry } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}
	switch (req.method) {
		case 'GET': await getCalendarWorkouts(req, res)
			break
		case 'DELETE': await deleteWorkout(req, res)
			break
		case 'PUT': await updateWorkout(req, res)
			break
		default:
			res.status(405).json({ message: 'Method not allowed' })
	}
}

/**
 * get all of the workouts created within a given date range and return to the front end
 * @param req next api request
 * @param res next api response
 */
const getCalendarWorkouts = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const startDate = new Date(req.query.start as string)
		const endDate = new Date(req.query.end as string)
		const templateId = String(req.query.templateId)

		const data = await getPreviousWorkouts(startDate, endDate, templateId)

		res.status(200).json(data)
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

const deleteWorkout = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const workoutId = String(req.query.workoutId)
		await deleteWorkoutEntry(workoutId)
		res.status(200).end()
	}
	catch (err) {
		res.status(500).end()
	}
}


const updateWorkout = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await updateWorkoutEntry(req.body.workout as WorkoutEntry)
		res.status(200).end()
	}
	catch (err) {
		res.status(500).end()
	}
}
