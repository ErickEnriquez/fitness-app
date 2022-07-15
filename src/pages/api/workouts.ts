import { NextApiRequest, NextApiResponse } from 'next'
import { getPreviousWorkouts } from '@server/getPreviousWorkouts'

export default async (req: NextApiRequest, res: NextApiResponse) => {

	switch (req.method) {
		case 'POST': await getCalendarWorkouts(req, res)
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
	const { start, end } = req.body
	const startDate = new Date(start)
	const endDate = new Date(end)
	const data = await getPreviousWorkouts(startDate, endDate)

	data ?
		res.status(200).json(data) :
		res.status(500).json({ message: 'Error' })
}