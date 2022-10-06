/* eslint-disable indent */
import { NextApiRequest, NextApiResponse } from 'next'
import { CardioState } from '@features/cardio/CardioSlice'
import { postCardio } from '@server/postCardio'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@auth/[...nextauth]'
import { getCardioData } from '@server/getCardioData'
import { updateCardio } from '@server/updateCardio'
import { deleteCardioEntry } from '@server/deleteCardioEntry'
import { Cardio, CardioType } from '@prisma/client'


export default async (req: NextApiRequest, res: NextApiResponse) => {

	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}


	switch (req.method) {
		case 'POST':
			await submitCardio(req, res, session?.user?.id); break
		case 'GET':
			await getCardioInfo(req, res); break
		case 'PUT':
			await updateCardioInfo(req, res); break
		case 'DELETE':
			await deleteCardio(req, res); break
		default:
			res.status(405).json({ message: 'Method not allowed' }); break
	}
}

/**
 * post the cardio data to the DB
 */
const submitCardio = async (req: NextApiRequest, res: NextApiResponse, userId = '') => {
	const completed = await postCardio(req.body as CardioState, userId)
	if (!completed) res.status(500).json({ message: 'unable to create note' })
	res.status(200).json({ message: 'success' })
}

/**
 * Query the Db and get the previous cardio data
 */
const getCardioInfo = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const id = Number(req.query.cardioId)
		const cardioInfo = await getCardioData(id)
		if (!cardioInfo) {
			res.status(400).end()
			return
		}
		res.status(200).json(cardioInfo)
	} catch (err) {
		console.error(err)
		res.status(500).end()
	}
}

/**
 * update the cardio info for the session given
 */
const updateCardioInfo = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const state = req.body

		//need to include timeCreated, and userId even though we aren't changing it since update cardio function is using the cardio type from prisma schema
		const updatedData: Cardio = {
			intensity: Number(state.intensity),
			id: Number(state.completedCardioId),
			timeCreated: new Date(),
			type: CardioType[state.type],
			caloriesBurned: Number(state.caloriesBurned),
			notes: String(state.notes),
			distance: (state.distance),
			time: Number(state.time),
			userId: ''
		}

		const updatedCardio = await updateCardio(updatedData)
		res.status(200).json({ ...updatedCardio, timeCreated: updatedCardio.timeCreated.toISOString() })
	}
	catch (err) {
		console.error(err)
		res.status(500).end
	}
}

const deleteCardio = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const cardioId = Number(req.query.cardioId)
		const status = await deleteCardioEntry(cardioId)
		if (!status) {
			res.status(404).end()
			return
		}
		res.status(200).end()
	} catch (err) {
		console.error(err)
		res.status(500).end()
	}
}