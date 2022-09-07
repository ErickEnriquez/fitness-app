import prisma from 'prisma/prisma'


/**
 * call prisma to delete the Workout Entry with the given workoutId 
 * @param workoutId 
 */
export async function deleteWorkoutEntry(workoutId: number) {
	try {
		await prisma.workoutEntry.delete({
			where: {
				id: workoutId
			}
		})
	} catch (err) {
		console.error(err)
		throw Error(err)
	}
}