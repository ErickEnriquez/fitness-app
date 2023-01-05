import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'
import { getMovement } from '@server/getMovement'

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}
	switch (req.method) {
		case 'GET': await getTemplate(req, res)
			break
		default:
			res.status(405).json({ message: 'Method not allowed' })

	}
}

const getTemplate = async (req: NextApiRequest, res: NextApiResponse) => {
	// const id = Number(req.query.movementId)
	const movement = await getMovement(req.query.movementId as string)
	if (!movement) {
		res.status(404).json({ message: 'Error finding movement' })
		return
	}
	res.status(200).json(movement)
}