import { getExercises } from '@server/getExercises'
import { NextApiRequest, NextApiResponse } from 'next'
import { getMovement } from '@server/getMovement'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'


export default async (req: NextApiRequest, res: NextApiResponse) => {

	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}
	switch (req.method) {
		case 'GET': await getExerciseTemplates(req, res)
			break
		default:
			res.status(405).json({ message: 'Method not allowed' })

	}
}

const getExerciseTemplates = async (req: NextApiRequest, res: NextApiResponse) => {

	const exercises = await getExercises(String(req.query.workoutId))
	//grab the name of the movements
	const data = await Promise.all(exercises.map(async (item) => {
		const movement = await getMovement(item.movementId)
		return { ...item, ['name']: movement.name }
	}))
	if (!exercises) {
		res.status(404).json({ message: 'Error finding exercises' })
		return
	}
	res.status(200).json(data)
}