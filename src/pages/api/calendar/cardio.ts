/* eslint-disable indent */
import { NextApiRequest, NextApiResponse } from 'next'
import { getPreviousCardio } from '@server/getPreviousCardio'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}


	switch (req.method) {
		case 'GET':
			await getCardioInRange(req, res, session?.user?.id); break
		default:
			res.status(405).json({ message: 'Method not allowed' }); break
	}
}

const getCardioInRange = async (req: NextApiRequest, res: NextApiResponse, userID = '') => {
	try {
		const startDate = String(req.query.start)
		const endDate = String(req.query.end)

		const cardio = await getPreviousCardio(startDate, endDate, userID)
		if (!cardio) {
			res.status(404).json({ message: 'Error finding cardio' })
			return
		}
		res.status(200).json(cardio)
	}
	catch (err) {
		console.error(err)
		res.status(500).json({ message: err })
	}
}