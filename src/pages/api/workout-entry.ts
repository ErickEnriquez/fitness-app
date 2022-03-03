import { NextApiRequest, NextApiResponse } from 'next'
import { getLastWorkout } from '@server/getLastWorkout' 
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method not allowed' })
	}
	console.log(req.query)

	return res.status(200)
}