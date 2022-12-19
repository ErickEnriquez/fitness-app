/* eslint-disable indent */
import { unstable_getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@auth/[...nextauth]'
import prisma from 'prisma/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}

	switch (req.method) {
		case 'GET': await getWorkout(req, res)
			break

		default:
			res.status(405).json({ message: 'Method not allowed' })
	}
}

/**
 * get the last workout given a workoutID
 * @param req 
 * @param res 
 */
const getWorkout = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		//if we get a param called workout type that is a number then we call the getWorkoutEntry function with 3 parameters else call the one with only 1 parameter
		if (req.query.workoutType && req.query.skip) {
			const workoutUsingType = await prisma.workoutEntry.findFirst({
				where: {
					workoutTemplateId: String(req.query.workoutType)
				},
				orderBy: { date: 'desc' },
				skip: Number(req.query.skip),
				include: {
					exercises: true
				}
			})
			if (!workoutUsingType) {
				console.warn('no workout found')
				res.status(400).end()
				return
			}
			res.status(200).json({
				...workoutUsingType,
				date: workoutUsingType.date.toISOString()
			})
			return
		}

		const workoutUsingId = await prisma.workoutEntry.findFirst({
			where: {
				id: String(req.query.Id)
			}
		})
			
		if (!workoutUsingId) {
			res.status(400).end()
			return
		}

		res.status(200).json({
			...workoutUsingId,
			date: workoutUsingId.date.toISOString()
		})

	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Error Finding Exercises' })
	}
}