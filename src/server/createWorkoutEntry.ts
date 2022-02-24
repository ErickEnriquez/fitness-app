import prisma from 'prisma/prisma'

export  async function createWorkoutEntry(templateId: number): Promise<number | boolean> { 
	try {
		const workoutEntry = await prisma.workoutEntry.create({
			data: {
				workoutTemplateId: templateId,
				date: new Date()
			}
		})
		return workoutEntry.id
	} catch (error) { 
		console.error(error)
		return false
	}
}