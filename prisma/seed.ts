import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	//write you seed data here
	await erickData()
	await addyData()
}

const erickData = async () => {
	const user = await prisma.user.findFirst({
		where: {
			email: 'erick.enriquez10.95@gmail.com'
		}
	})

	await prisma.program.create({
		data: {
			name: 'Project Mass V2', userId: user.id,
		}
	})

	const program = await prisma.program.findFirst({
		where: {
			userId: user.id
		}
	})

	const pushHeavy = prisma.workoutTemplate.create({
		data: {
			name: 'Push Heavy', type: 'pushHeavy', programId: program.id, exerciseTemplates: {
				create: [
					{ sets: 5, reps: 5, movement: { create: { name: 'Bench Press' } } },
					{ sets: 5, reps: 5, movement: { create: { name: 'Decline Bench Press' } } },
					{ sets: 4, reps: 6, movement: { create: { name: 'Chest Flys' } } },
					{ sets: 5, reps: 5, movement: { create: { name: 'Shoulder Press' } } },
					{ sets: 4, reps: 6, movement: { create: { name: 'Incline Bench Press' } } },
					{ sets: 5, reps: 5, movement: { create: { name: 'Tricep Push downs' } } },
					{ sets: 3, reps: 8, movement: { create: { name: 'Dips' } } },
				]
			}
		}
	})

	const pushLight = prisma.workoutTemplate.create({
		data: {
			name: 'Push Light', type: 'pushLight', programId: program.id, exerciseTemplates: {
				create: [
					{ sets: 4, reps: 12, movement: { create: { name: 'Dumbbell Press' } } },
					{ sets: 4, reps: 10, movement: { create: { name: 'Military Press' } } },
					{ sets: 4, reps: 10, movement: { create: { name: 'Skull Crusher' } } },
					{ sets: 3, reps: 12, movement: { create: { name: 'Narrow Grip Bench' } } },
					{ sets: 4, reps: 10, movement: { create: { name: 'Side Raises' } } },
					{ sets: 3, reps: 12, movement: { create: { name: 'Tricep Push downs, 1 Arm' } } },
					{ sets: 3, reps: 15, movement: { create: { name: 'Seated Dips' } } },
				]
			}
		}
	})

	const pullHeavy = prisma.workoutTemplate.create({
		data: {
			name: 'Pull Heavy', type: 'pullHeavy', programId: program.id, exerciseTemplates: {
				create: [
					{ sets: 5, reps: 5, movement: { create: { name: 'Deadlifts' } } },
					{ sets: 5, reps: 5, movement: { create: { name: 'Pull-ups' } } },
					{ sets: 4, reps: 6, movement: { create: { name: 'Bicep Curls' } } },
					{ sets: 5, reps: 5, movement: { create: { name: 'Standing Shrugs' } } },
					{ sets: 4, reps: 6, movement: { create: { name: 'Machine High Rows' } } },
					{ sets: 5, reps: 5, movement: { create: { name: 'Seated Rows' } } },
					{ sets: 3, reps: 8, movement: { create: { name: 'Front Raises' } } },
				]
			}
		}
	})

	const pullLight = prisma.workoutTemplate.create({
		data: {
			name: 'Pull Light', type: 'pullLight', programId: program.id, exerciseTemplates: {
				create: [
					{ sets: 4, reps: 12, movement: { create: { name: 'Wide Deadlifts' } } },
					{ sets: 4, reps: 10, movement: { create: { name: 'Lat Pulldown' } } },
					{ sets: 4, reps: 10, movement: { create: { name: 'Bent-over BB Rows' } } },
					{ sets: 3, reps: 12, movement: { create: { name: 'Face Pulls' } } },
					{ sets: 4, reps: 10, movement: { create: { name: 'Preacher Curls' } } },
					{ sets: 3, reps: 12, movement: { create: { name: 'Rack Pulls' } } },
					{ sets: 3, reps: 15, movement: { create: { name: 'Hammer Curls' } } },
				]
			}
		}
	})

	const legsHeavy = prisma.workoutTemplate.create({
		data: {
			name: 'Legs Heavy', type: 'legsHeavy', programId: program.id, exerciseTemplates: {
				create: [
					{ sets: 5, reps: 5, movement: { create: { name: 'Back Squat' } } },
					{ sets: 5, reps: 5, movement: { create: { name: 'Leg Press' } } },
					{ sets: 4, reps: 6, movement: { create: { name: 'Hip thrust' } } },
					{ sets: 5, reps: 5, movement: { create: { name: 'Romanian Deadlift' } } },
					{ sets: 4, reps: 6, movement: { create: { name: 'Leg Extension' } } },
					{ sets: 5, reps: 5, movement: { create: { name: 'Lunges' } } },
					{ sets: 3, reps: 8, movement: { create: { name: 'Hack Squat' } } },
				]
			}
		}
	})

	const legsLight = prisma.workoutTemplate.create({
		data: {
			name: 'Legs Light', type: 'legsLight', programId: program.id, exerciseTemplates: {
				create: [
					{ sets: 4, reps: 12, movement: { create: { name: 'Front Squat' } } },
					{ sets: 4, reps: 10, movement: { create: { name: '1 Legged Press' } } },
					{ sets: 4, reps: 10, movement: { create: { name: 'Hip Abductor' } } },
					{ sets: 3, reps: 12, movement: { create: { name: 'Hip Adductor' } } },
					{ sets: 4, reps: 10, movement: { create: { name: 'Leg Curls' } } },
					{ sets: 3, reps: 12, movement: { create: { name: 'Bulgarian Split Squat' } } },
					{ sets: 3, reps: 15, movement: { create: { name: 'Calf Raises' } } },
				]
			},
		}
	})

	await prisma.$transaction([
		pushHeavy,
		pushLight,
		pullHeavy,
		pullLight,
		legsHeavy,
		legsLight
	])
}

const addyData = async () => {
	const user = await prisma.user.findFirst({
		where: {
			email: 'ambwork23@gmail.com'
		}
	})

	await prisma.program.create({
		data: {
			name: 'Addy Workouts', userId: user.id,
		}
	})

	const program = await prisma.program.findFirst({
		where: {
			userId: user.id
		}
	})

	const pushHeavy = prisma.workoutTemplate.create({
		data: {
			name: 'Push Heavy', type: 'pushHeavy', programId: program.id, exerciseTemplates: {
				create: [
					{ sets: 5, reps: 5, movement: { create: { name: 'Bench Press' } } },
					{ sets: 5, reps: 10, movement: { create: { name: 'Skull Crusher' } } },
					{ sets: 4, reps: 8, movement: { create: { name: 'Chest Flys' } } },
					{ sets: 5, reps: 6, movement: { create: { name: 'Shoulder Press' } } },
					{ sets: 4, reps: 8, movement: { create: { name: 'Side Raises' } } },
					{ sets: 5, reps: 10, movement: { create: { name: 'Tricep Push downs' } } },
					{ sets: 3, reps: 8, movement: { create: { name: 'Dips' } } },
				]
			}
		}
	})

	const pullHeavy = prisma.workoutTemplate.create({
		data: {
			name: 'Pull Heavy', type: 'pullHeavy', programId: program.id, exerciseTemplates: {
				create: [
					{ sets: 5, reps: 5, movement: { create: { name: 'Deadlifts' } } },
					{ sets: 5, reps: 6, movement: { create: { name: 'Pull-ups' } } },
					{ sets: 4, reps: 8, movement: { create: { name: 'Bicep Curls' } } },
					{ sets: 5, reps: 8, movement: { create: { name: 'Standing Shrugs' } } },
					{ sets: 4, reps: 10, movement: { create: { name: 'Machine High Rows' } } },
					{ sets: 5, reps: 10, movement: { create: { name: 'Seated Rows' } } },
					{ sets: 3, reps: 8, movement: { create: { name: 'Front Raises' } } },
				]
			}
		}
	})

	const legsHeavy = prisma.workoutTemplate.create({
		data: {
			name: 'Legs Heavy', type: 'legsHeavy', programId: program.id, exerciseTemplates: {
				create: [
					{ sets: 5, reps: 5, movement: { create: { name: 'Back Squat' } } },
					{ sets: 5, reps: 8, movement: { create: { name: 'Leg Press' } } },
					{ sets: 4, reps: 8, movement: { create: { name: 'Hip thrust' } } },
					{ sets: 5, reps: 8, movement: { create: { name: 'Hip Abductor' } } },
					{ sets: 5, reps: 8, movement: { create: { name: 'Hip Adductor' } } },
					{ sets: 4, reps: 6, movement: { create: { name: 'Leg Extension' } } },
					{ sets: 3, reps: 10, movement: { create: { name: 'Calf Raises' } } },
				]
			}
		}
	})

	await prisma.$transaction([
		pushHeavy,
		pullHeavy,
		legsHeavy,
	])
}


main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})