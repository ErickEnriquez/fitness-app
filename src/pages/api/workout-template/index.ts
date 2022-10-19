import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'

import { getWorkoutTemplate } from '@server/WorkoutTemplate/getWorkoutTemplate'


export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}
	switch (req.method) {
	case 'GET': await returnWorkoutTemplatesForProgram(req, res)
		break
	default:
		res.status(405).json({ message: 'Method not allowed' })
	}
}

const returnWorkoutTemplatesForProgram = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const programId = Number(req?.query?.programId)
		const workoutTemplates = await getWorkoutTemplate(programId)
		if (!workoutTemplates) {
			res.status(404).end()
			return
		}
		res.status(200).json(workoutTemplates)
	}
	catch (err) {
		res.status(500).json({ message: 'Error Finding Exercises' })
	}
}