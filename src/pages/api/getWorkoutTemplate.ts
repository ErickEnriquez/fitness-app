import { NextApiRequest, NextApiResponse } from 'next'
import { getWorkoutTemplate } from '@server/getWorkoutTemplate'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method not allowed' })
	}
	const workoutTemplate = await getWorkoutTemplate()
	
	workoutTemplate
		? res.status(200).json(workoutTemplate)
		: res.status(404).json({ message: 'Error finding exercises' })
}