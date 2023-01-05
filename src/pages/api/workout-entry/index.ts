/* eslint-disable indent */
import { unstable_getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@auth/[...nextauth]'
<<<<<<< HEAD:src/pages/api/workout-entry.ts
import prisma from 'prisma/prisma'
=======
import { getWorkoutEntryByType } from '@server/WorkoutEntry/getWorkoutEntryByType'

>>>>>>> 6c59c7039e58ac1cfe512608630b842e54ec550c:src/pages/api/workout-entry/index.ts

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
<<<<<<< HEAD:src/pages/api/workout-entry.ts
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
=======
		if (!req.query.workoutType || !req.query.skip || Number.isNaN(Number(req.query.workoutType))) {
			throw Error('Error with params')
		}
			
		const workout = await getWorkoutEntryByType(Number(req.query.workoutType), Number(req.query.skip))

		if (!workout) {
			res.status(404).end()
			return
		}
		res.status(200).json(workout)
	} catch (err) {
		console.error(err)
		res.status(500).end()
>>>>>>> 6c59c7039e58ac1cfe512608630b842e54ec550c:src/pages/api/workout-entry/index.ts
	}
}