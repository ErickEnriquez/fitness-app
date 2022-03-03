import { NextApiRequest, NextApiResponse } from 'next'
import { getLastWorkout } from '@server/getLastWorkout' 
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed' })
	}
	const workoutList = req.body.workoutList as number[]
	console.log(workoutList)

	return res.status(200).json({message:'done'})
}