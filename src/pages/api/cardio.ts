/* eslint-disable indent */
import { NextApiRequest, NextApiResponse } from 'next'
import { CardioState } from '@features/cardio/CardioSlice'
import { postCardio } from '@server/postCardio'

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
			await submitCardio(req, res, session?.user?.id); break
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
const submitCardio = async (req: NextApiRequest, res: NextApiResponse, userId = '') => {
	const completed = await postCardio(req.body as CardioState, userId)
	if (!completed) res.status(500).json({ message: 'unable to create note' })
	res.status(200).json({ message: 'success' })
}