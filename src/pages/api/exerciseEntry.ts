import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'
import { getExerciseTemplate } from '@server/getExerciseTemplate'
import { updateExerciseEntries } from '@server/updateExerciseEntries'
import { PreviousExercise } from '@features/history/PreviousWorkoutSlice'
import { ExerciseEntry } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}
	switch (req.method) {
	case 'GET': await getTemplate(req, res)
		break
	case 'PUT': await updateExercises(req, res)
		break
	default:
		res.status(405).json({ message: 'Method not allowed' })

	}
}

const getTemplate = async (req: NextApiRequest, res: NextApiResponse) => {
	const id = String(req.query.exerciseId)
	const template = await getExerciseTemplate(id)
	if (!template) {
		res.status(404).json({ message: 'Error finding exercises' })
		return
	}
	res.status(200).json(template)
}

const updateExercises = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const previousExercises = req.body.exercises as PreviousExercise[]
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const exercises = previousExercises.map(({ reps, name, editable, ...rest }) => rest) as ExerciseEntry[]
		await updateExerciseEntries(exercises)
		res.status(200).end()
	} catch (err) {
		console.error(err)
		res.status(500).end()
	}

}