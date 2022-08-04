/* eslint-disable indent */
import { unstable_getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@auth/[...nextauth]'
import { getWorkoutEntry } from '@server/getWorkoutEntry'

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

	//if we get a param called workout type that is a number then we call the getWorkoutEntry function with 3 parameters else call the one with only 1 parameter
	const workout = isNaN(Number(req.query.workoutType)) ?
		await getWorkoutEntry(Number(req.query.Id)) :
		await getWorkoutEntry(Number(req.query.workoutType), Number(req.query.skip), true)

	if (workout === null) {
		res.status(404).end()
		return
	}

	res.status(200).json(workout)
}
