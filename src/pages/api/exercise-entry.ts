import { NextApiRequest, NextApiResponse } from 'next'
import { postExerciseEntries } from '@server/postExerciseEntries'
import {createWorkoutEntry} from '@server/createWorkoutEntry'
import {getExerciseEntries} from '@server/getExerciseEntries'

export default async (req: NextApiRequest, res: NextApiResponse) => { 

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
	//create the workout entry in the db first
	const workoutEntry = await createWorkoutEntry(data.templateId)
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
	//grab the data, which should be an array of user entries and a workoutId
	const id = Number(req.query.workoutId)
	const data = await getExerciseEntries(id)
	data ?
		res.status(200).json(data) :
		res.status(200).json({data:null})
}