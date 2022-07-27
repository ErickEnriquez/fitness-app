/* eslint-disable indent */
import { NextApiRequest, NextApiResponse } from 'next'
import { getLastWorkoutOfType } from '@server/getLastWorkoutOfType'
import { getWorkoutEntry } from '@server/getWorkoutEntry'
import { Workout } from '@prisma/client'
export default async (req: NextApiRequest, res: NextApiResponse) => {

	switch (req.method) {
		case 'GET': await getPreviousWorkout(req, res)
			break
		case 'POST': await lastWorkoutOfType(req, res)
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
const getPreviousWorkout = async (req: NextApiRequest, res: NextApiResponse) => {

	//if we get a param called workout type that is a number then we call the getWorkoutEntry function with 3 parameters else call the one with only 1 parameter
	const workout = isNaN(Number(req.query.workoutType)) ?
		await getWorkoutEntry(Number(req.query.Id)) :
		await getWorkoutEntry(Number(req.query.workoutType), Number(req.query.skip), true)
	
	if(workout === null) return res.status(204)
	
	return res.status(200).json(workout)
}

/**
 * return the last workout of the given type ie. pusheavy, pullheavy, etc.
 * @param req 
 * @param res 
 * @returns 
 */
const lastWorkoutOfType = async (req: NextApiRequest, res: NextApiResponse) => {
	const workoutTemplates = req.body.workoutTemplates.data as Workout[]

	const lastWorkouts = await (
		await Promise.all(workoutTemplates
			.map((item) => getLastWorkoutOfType(item.id))))
		.filter(item => item !== null)


	return res.status(200).json(lastWorkouts)
}