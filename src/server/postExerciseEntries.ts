import prisma from 'prisma/prisma'

export async function postExerciseEntries(entries: any): Promise<boolean> {
	try {
		const response = await Promise.all(entries.map((entry: any) => {
			return prisma.exerciseEntry.create({
				data: {
					notes: entry.notes || undefined,
					intensity: entry.intensity || undefined,
					order: entry.order || undefined,
					weights: entry.weights,
					exerciseID: entry.id,
					workoutID: entry.workoutId
				}
			})
		}))
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}