import prisma from 'prisma/prisma'
/**
 * given an exerciseId, return the exercise template info
 * @param exerciseId 
 */
export async function getExerciseTemplate(exerciseId: number) {
	try {
		const data = await prisma.exerciseTemplate.findFirst({
			where: {
				id: exerciseId
			}
		})
		return data
	} catch (err) {
		console.error(err)
		throw Error(err)
	}
}