/* eslint-disable indent */
import { NextApiRequest, NextApiResponse } from 'next'
import { CardioState } from '@features/cardio/CardioSlice'
import { postCardio } from '@server/postCardio'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'POST':
			await submitCardio(req, res); break
		default:
			res.status(405).json({ message: 'Method not allowed' }); break
	}
}

/**
 * post the cardio data to the DB
 * @param req 
 * @param res 
 * @returns {boolean} result if the operation was successful or not
 */
const submitCardio = async (req: NextApiRequest, res: NextApiResponse) => {
	const completed = await postCardio(req.body as CardioState)
	if (!completed) res.status(500).json({ message: 'unable to create note' })
	res.status(200).json({ message: 'success' })
}