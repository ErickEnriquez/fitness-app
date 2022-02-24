import prisma from 'prisma/prisma'

export  async function createWorkout(templateId: number): Promise<number | boolean> { 
	try {
		const workoutEntry = await prisma.workoutEntry.create({
			data: {
				workoutTemplateId: templateId,
			}
		})
		return workoutEntry.id
	} catch (error) { 
		console.error(error)
		return false
	}
}