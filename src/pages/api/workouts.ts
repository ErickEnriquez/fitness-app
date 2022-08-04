import { NextApiRequest, NextApiResponse } from 'next'
import { getPreviousWorkouts } from '@server/getPreviousWorkouts'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}
	switch (req.method) {
		case 'GET': await getCalendarWorkouts(req, res)
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
	const startDate = new Date(req.query.start as string)
	const endDate = new Date(req.query.end as string)

	const data = await getPreviousWorkouts(startDate, endDate)

	if (!data) {
		res.status(500).end()
		return
	}

	res.status(200).json(data)

}
