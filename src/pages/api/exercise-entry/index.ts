import { NextApiRequest, NextApiResponse } from 'next'
import { postExerciseEntries } from '@server/postExerciseEntries'
import { createWorkoutEntry } from '@server/createWorkoutEntry'
import { getExerciseEntries } from '@server/getExerciseEntries'
import { activeWorkoutInfo } from '@features/exercise/ExerciseSlice'
import { UserEntry } from '@features/exercise/ExerciseSlice'
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

/**take the request and upload the results to DB */
async function postEntries(req: NextApiRequest, res: NextApiResponse) {
	try {
		//grab the data, which should be an array of user entries and a workoutId
		const { entries, workoutEntry }: { entries: UserEntry[], workoutEntry: activeWorkoutInfo } = req.body
		
		if (!entries || !workoutEntry) {
			res.status(400).json({ message: 'please include data' })
			return
		}

		//create the workout entry in the db first
		const newWorkoutId = await createWorkoutEntry(workoutEntry)
		if (!newWorkoutId) { 
			res.status(400).json({message:'unable to create new workout'})
			return
		}
		
		//then create the exercise entries in the db and link them to a workout
		await postExerciseEntries(entries, newWorkoutId)

		res.status(200).json({message:'Success'})

	} catch (err) {
		console.error(err)
		res.status(500).json({message:'error has occurred please try again later'})
	}
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