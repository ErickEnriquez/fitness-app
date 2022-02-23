import { NextApiRequest, NextApiResponse } from 'next'
import { postExerciseEntries } from '@server/postExerciseEntries'

export default async (req: NextApiRequest, res: NextApiResponse) => { 
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed' })
	}
	const entries = req.body
	const response = await postExerciseEntries(entries)
	
	response ? res.status(200).json({ message: 'Success' }) : res.status(500).json({ message: 'Error' })	
}