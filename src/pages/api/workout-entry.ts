import { NextApiRequest, NextApiResponse } from 'next'
import { getLastWorkout } from '@server/getLastWorkout' 
import { Workout } from '@prisma/client'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed' })
	}

	const workoutTemplates = req.body.workoutTemplates.data as Workout[]
	
	const lastWorkouts = await (
		await Promise.all(workoutTemplates
			.map((item) => getLastWorkout(item.id))))
		.filter(item => item !== null)
	

	return res.status(200).json(lastWorkouts)
}