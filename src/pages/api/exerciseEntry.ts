import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'
import { getExerciseTemplate } from '@server/getExerciseTemplate'

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
	const id = Number(req.query.exerciseId)
	const template = await getExerciseTemplate(id)
	if (!template) {
		res.status(404).json({ message: 'Error finding exercises' })
		return
	}
	res.status(200).json(template)
}