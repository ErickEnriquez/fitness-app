/* eslint-disable indent */
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'
import prisma from 'prisma/prisma'
import { SerializedCardio } from '@server/cardio'

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

/** given a start and end date in the request query field, return all of the cardio sessions that are from the user that fit that time frame. 
 * the return will be a list of the cardio sessions with the timeCreated field serialized to a string
 */
const getCardioInRange = async (req: NextApiRequest, res: NextApiResponse, userID = '') => {
	try {
		const startDate = String(req.query.start)
		const endDate = String(req.query.end)

		const cardio = await prisma.cardio.findMany({
			where: {
				AND: [
					{ userId:userID },
					{
						timeCreated: {
							gte: startDate,
							lte: endDate
						}
					}
				]
			}
		})

		if (!cardio) {
			res.status(404).json({ message: 'Error finding cardio' })
			return
		}

		//convert the timeCreated field from a date to a string to send back to the front end
		const serializedCardio:SerializedCardio[] = cardio.map(cardio => ({ ...cardio, timeCreated: cardio.timeCreated.toISOString() }))
		
		res.status(200).json(serializedCardio)
	}
	catch (err) {
		console.error(err)
		res.status(500).json({ message: err })
	}
}