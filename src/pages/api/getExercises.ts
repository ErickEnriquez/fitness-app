import { getExercises } from '@server/getExercises'
import { NextApiRequest, NextApiResponse } from 'next'
import { getMovement } from '@server/getMovement'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method not allowed' })
	}
	const id = Number(req.query.workoutId)
	const exercises = await getExercises(id)
	//grab the name of the movements
	const data = await Promise.all(exercises.map(async (item) => {
		const movement = await getMovement(item.movementID)
		return {...item, ['name']: movement.name}
	}))
	exercises
		? res.status(200).json(data)
		: res.status(404).json({ message: 'Error finding exercises' })
}