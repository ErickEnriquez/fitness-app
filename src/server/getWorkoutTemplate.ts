import prisma from 'prisma/prisma'
import {Workout} from '@prisma/client'
//return all of the possible workout types , ie push heavy, pull heavy, legs light
export async function getWorkoutTemplate():Promise<Workout[]> {
	const workoutArray = await prisma.workout.findMany({})
	return workoutArray
}