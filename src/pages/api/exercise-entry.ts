import { NextApiRequest, NextApiResponse } from 'next'
import { getExerciseEntries } from '@server/getExerciseEntries'
import { activeWorkoutInfo, UserEntry } from '@features/exercise/ExerciseSlice'
import prisma from 'prisma/prisma'


import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'


export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}

	switch (req.method) {
	case 'POST':
		await postEntries(req, res); break
	case 'GET':
		await getWorkoutEntries(req, res); break
	default:
		res.status(405).json({ message: 'Method not allowed' })
	}
}


async function postEntries(req: NextApiRequest, res: NextApiResponse) {
	try {
		//grab the data, which should be an array of user entries and a workoutId
		const data = req.body

		const activeWorkout = data.workoutEntry as activeWorkoutInfo
		const entries = data.exerciseEntries as UserEntry[]
		//create the workout entry in the db and attach all of the exercise entries to it

		const newWorkout = await prisma.workoutEntry.create({
			data: {
				workoutTemplateId: activeWorkout.workoutTemplateId,
				notes: activeWorkout.notes || undefined,
				grade: activeWorkout.grade || undefined,
				preWorkout: activeWorkout.preWorkout || false,
				date: new Date(),
				exercises: {
					createMany:
					{
						data: entries.map(e => (
							{
								notes: e.notes || undefined,
								intensity: e.intensity || undefined,
								order: e.order || undefined,
								weights: e.weights.map(w => w || undefined),
								exerciseId: e.id || undefined,
							}
						))
					}
				}
			}
		})

		if (!newWorkout) {
			res.status(500).json({ message: 'Failed to create workout' })
			return
		}

		res.status(200).end()
	} catch (err) { 
		console.error(err)
		res.status(500).json({ message: 'Server error, failed to create workout' })
	}
}


async function getWorkoutEntries(req: NextApiRequest, res: NextApiResponse) {
	//grab the data, which should be an array of user entries and a workoutId
	const data = await getExerciseEntries(String(req.query.workoutId))
	data ?
		res.status(200).json(data) :
		res.status(200).json({ data: null })
}