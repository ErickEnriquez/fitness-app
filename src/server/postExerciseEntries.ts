import prisma from 'prisma/prisma'

export async function postExerciseEntries(entries: any, id:number): Promise<boolean> {
	try {
		await Promise.all(entries.map((entry: any) => {
			return prisma.exerciseEntry.create({
				data: {
					notes: entry.notes || undefined,
					intensity: entry.intensity || undefined,
					order: entry.order || undefined,
					weights: entry.weights,
					exerciseID: entry.id,
					workoutID: id
				}
			})
		}))
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}