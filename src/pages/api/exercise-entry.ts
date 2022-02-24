import { NextApiRequest, NextApiResponse } from 'next'
import { postExerciseEntries } from '@server/postExerciseEntries'
import {createWorkout} from '@server/createWorkout'

export default async (req: NextApiRequest, res: NextApiResponse) => { 
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed' })
	}
	//grab the data, which should be an array of user entries and a workoutId
	const data = req.body
	//create the workout entry in the db first
	const success = await createWorkout(data.templateId)
	if (!success) { 
		res.status(500).json({ message: 'Failed to create workout' })
	}
	//then create the exercise entries in the db and link them to a workout
	const response = await postExerciseEntries(data.entries)
	
	response ? res.status(200).json({ message: 'Success' }) : res.status(500).json({ message: 'Error' })	
}