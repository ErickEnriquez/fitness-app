/* eslint-disable indent */
import { unstable_getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@auth/[...nextauth]'
import { getWorkoutEntryByType } from '@server/WorkoutEntry/getWorkoutEntryByType'

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}

	switch (req.method) {
		case 'GET': await getWorkout(req, res)
			break

		default:
			res.status(405).json({ message: 'Method not allowed' })
	}
}

/**
 * get the last workout given a workoutID
 * @param req 
 * @param res 
 */
const getWorkout = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const workout = await getWorkoutEntryByType(Number(req.query.workoutType), Number(req.query.skip))

		if (!workout) {
			res.status(404).end()
			return
		}
		res.status(200).json(workout)
	} catch (err) {
		console.error(err)
		res.status(500).end()
	}
}