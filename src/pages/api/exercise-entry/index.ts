import { NextApiRequest, NextApiResponse } from 'next'
import { postExerciseEntries } from '@server/postExerciseEntries'
import { createWorkoutEntry } from '@server/createWorkoutEntry'
import { getExerciseEntries } from '@server/getExerciseEntries'
import { activeWorkoutInfo } from '@features/exercise/ExerciseSlice'

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
	//grab the data, which should be an array of user entries and a workoutId
	const data = req.body

	const activeWorkout = data.workoutEntry as activeWorkoutInfo
	//create the workout entry in the db first
	const workoutEntry = await createWorkoutEntry(activeWorkout)
	if (!workoutEntry) {
		res.status(500).json({ message: 'Failed to create workout' })
	}
	//then create the exercise entries in the db and link them to a workout
	const response = await postExerciseEntries(data.entries, workoutEntry as number)

	response ?
		res.status(200).json({ message: 'Success' })
		: res.status(500).json({ message: 'Error' })
}


async function getWorkoutEntries(req: NextApiRequest, res: NextApiResponse) {
	try {
		//grab the data, which should be an array of user entries and a workoutId
		const id = Number(req.query.workoutId)
		const data = await getExerciseEntries(id)
		if (!data) res.status(404).end()
		
		res.status(200).json(data)
	} catch (err) {
		console.error(err)
		res.status(500).end()
	}
}