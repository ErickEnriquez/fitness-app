import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	// await prisma.workout.createMany({
	// 	data: [
	// 		{ id: 7, type: 'other', programID: 2, name: 'Press Heavy' },
	// 		{ id: 8, type: 'other', programID: 2, name: 'Pull Heavy' },
	// 		{ id: 9, type: 'other', programID: 2, name: 'Legs Heavy' },
	// 	]
	// })
	prisma.exerciseTemplate.createMany({
		data: [
			// PUSH
			{ id: 44, sets: 3, reps: 10, movementID: 4, workoutId: 7 },//machine flys
			{ id: 45, sets: 3, reps: 8, movementID: 6, workoutId: 7 },//shoulder press
			{ id: 46, sets: 3, reps: 10, movementID: 27, workoutId: 7 },//standing side raises
			{ id: 47, sets: 3, reps: 6, movementID: 5, workoutId: 7 },//dips

			//PULL
			{ id: 48, sets: 3, reps: 10, movementID: 33, workoutId: 8 },//preacher curls
			{ id: 49, sets: 4, reps: 12, movementID: 32, workoutId: 8 },//wide grip lat pulldown
			{ id: 50, sets: 3, reps: 10, movementID: 34, workoutId: 8 },//standing front raises	
			// { id: 51, sets: 3, reps: 6, movementID: 10, workoutId: 8 },//pull-ups

			//LEGS

		]
	})
}
//write you seed data here

//create the initial program that we will need
// 	await prisma.program.upsert({
// 		where: { id: 1 },
// 		update: {},
// 		create: { id: 1, name: 'Project Mass', userId: '' },
// 	})

// 	await prisma.workout.createMany({
// 		data: [
// 			{ id: 1, type: 'pushHeavy', programID: 1 },
// 			{ id: 2, type: 'pullHeavy', programID: 1 },
// 			{ id: 3, type: 'legsHeavy', programID: 1 },
// 			{ id: 4, type: 'pushLight', programID: 1 },
// 			{ id: 5, type: 'pullLight', programID: 1 },
// 			{ id: 6, type: 'legsLight', programID: 1 },
// 		]
// 	})

// 	//create the workouts that we already are doing as a base
// 	await prisma.movement.createMany({
// 		data: [
// 			//push heavy
// 			{ id: 1, name: 'Bench Press' },
// 			{ id: 2, name: 'Incline Bench Press' },
// 			{ id: 3, name: 'Decline Bench Press' },
// 			{ id: 4, name: 'Machine Flys' },
// 			{ id: 5, name: 'Dips' },
// 			{ id: 6, name: 'Shoulder Press' },
// 			{ id: 7, name: 'Tricep Pulldowns' },
// 			//pull heavy
// 			{ id: 8, name: 'Deadlift' },
// 			{ id: 9, name: 'Bent Over Row' },
// 			{ id: 10, name: 'Pullups' },
// 			{ id: 11, name: 'Cable Curl' },
// 			{ id: 12, name: 'Standing Dumbbell Shrug' },
// 			{ id: 13, name: 'Machine High Row' },
// 			{ id: 14, name: 'Seated Rows' },
// 			//legs heavy
// 			{ id: 15, name: 'Back Squat' },
// 			{ id: 16, name: 'Leg Press' },
// 			{ id: 17, name: 'Leg Extensions' },
// 			{ id: 18, name: 'Leg Curls' },
// 			{ id: 19, name: 'Romanian Deadlift' },
// 			{ id: 20, name: 'Lunges' },
// 			// { id:21,name: 'Butt Raises' },
// 			//push light
// 			{ id: 22, name: 'Incline Dumbbell Press' },
// 			{ id: 23, name: 'Military Press' },
// 			{ id: 24, name: 'Narrow Grip Bench Press' },
// 			{ id: 25, name: 'Skull Crushers' },
// 			{ id: 26, name: '1 Arm Tricep Pulldown' },
// 			{ id: 27, name: 'Standing Side Raises' },
// 			{ id: 28, name: 'Seated Dips' },
// 			//pull light
// 			{ id: 29, name: 'Sumo Deadlift' },
// 			{ id: 30, name: 'Concentration Curls' },
// 			{ id: 31, name: 'Incline Dumbbell Row' },
// 			{ id: 32, name: 'Wide Grip Lat Pulldown' },
// 			{ id: 33, name: 'Preacher Curls' },
// 			{ id: 34, name: 'Front Raises' },
// 			//legs light
// 			{ id: 35, name: 'Seated Calf Raises' },
// 			{ id: 36, name: 'Bulgarian Split Squats' },
// 			{ id: 37, name: 'Front Squat' },
// 			{ id: 38, name: 'Hip Thrust' },
// 			{ id: 39, name: '1 Legged Press' },
// 		],
// 		skipDuplicates: true,
// 	})

// 	await prisma.exerciseTemplate.createMany({
// 		data: [
// 			//push heavy
// 			{ id: 1, sets: 5, reps: 5, movementID: 1, workoutId: 1 },//bench press
// 			{ id: 2, sets: 3, reps: 6, movementID: 2, workoutId: 1 },//Incline press
// 			{ id: 3, sets: 5, reps: 5, movementID: 3, workoutId: 1 },//decline press
// 			{ id: 4, sets: 4, reps: 6, movementID: 4, workoutId: 1 },//machine flys
// 			{ id: 5, sets: 3, reps: 8, movementID: 5, workoutId: 1 },//dips
// 			{ id: 6, sets: 5, reps: 5, movementID: 6, workoutId: 1 },//shoulder press
// 			{ id: 7, sets: 4, reps: 6, movementID: 7, workoutId: 1 },//Tricep pulldowns

// 			//pull heavy
// 			{ id: 8, sets: 5, reps: 5, movementID: 8, workoutId: 2 },//deadlift
// 			{ id: 9, sets: 5, reps: 5, movementID: 9, workoutId: 2 },//bent over row
// 			{ id: 10, sets: 4, reps: 6, movementID: 10, workoutId: 2 },//pull-ups
// 			{ id: 11, sets: 4, reps: 6, movementID: 11, workoutId: 2 },//cable curls
// 			{ id: 12, sets: 3, reps: 8, movementID: 12, workoutId: 2 },//standing dumbbell shrug
// 			{ id: 13, sets: 5, reps: 5, movementID: 13, workoutId: 2 },//machine high row
// 			{ id: 14, sets: 4, reps: 6, movementID: 14, workoutId: 2 },//seated rows

// 			//legs heavy
// 			{ id: 15, sets: 5, reps: 5, movementID: 15, workoutId: 3 },//back squat
// 			{ id: 16, sets: 5, reps: 5, movementID: 16, workoutId: 3 },//leg press
// 			{ id: 17, sets: 5, reps: 5, movementID: 19, workoutId: 3 },//RDL
// 			{ id: 18, sets: 3, reps: 8, movementID: 18, workoutId: 3 },// Leg curls
// 			{ id: 19, sets: 3, reps: 8, movementID: 17, workoutId: 3 },//RDL Leg extension
// 			{ id: 20, sets: 3, reps: 6, movementID: 20, workoutId: 3 },//Lunges
// 			{ id: 21, sets: 4, reps: 8, movementID: 38, workoutId: 3 },//Hip Thrust

// 			//push light
// 			{ id: 22, sets: 5, reps: 12, movementID: 22, workoutId: 4 },//incline dumbbell press
// 			{ id: 23, sets: 4, reps: 10, movementID: 23, workoutId: 4 },//Military press
// 			{ id: 24, sets: 4, reps: 12, movementID: 24, workoutId: 4 },//Narrow Grip press
// 			{ id: 25, sets: 4, reps: 12, movementID: 25, workoutId: 4 },//skull crushers 
// 			{ id: 26, sets: 3, reps: 12, movementID: 26, workoutId: 4 },//1 arm tricep pulldown
// 			{ id: 27, sets: 4, reps: 10, movementID: 27, workoutId: 4 },//standing side raises	
// 			{ id: 28, sets: 4, reps: 12, movementID: 28, workoutId: 4 },//cable flys

// 			//pull light
// 			{ id: 29, sets: 5, reps: 10, movementID: 29, workoutId: 5 },//deadlift
// 			{ id: 30, sets: 4, reps: 10, movementID: 30, workoutId: 5 },//concentration curls
// 			{ id: 31, sets: 4, reps: 12, movementID: 31, workoutId: 5 },//incline dumbbell row
// 			{ id: 32, sets: 4, reps: 12, movementID: 32, workoutId: 5 },//wide grip lat pulldown
// 			{ id: 33, sets: 3, reps: 10, movementID: 33, workoutId: 5 },//preacher curls
// 			{ id: 34, sets: 4, reps: 10, movementID: 34, workoutId: 5 },//standing front raises	
// 			{ id: 35, sets: 4, reps: 12, movementID: 10, workoutId: 5 },//pullups

// 			//legs light
// 			{ id: 37, sets: 5, reps: 10, movementID: 15, workoutId: 6 },//back squat
// 			{ id: 38, sets: 4, reps: 10, movementID: 35, workoutId: 6 },//seated calf raises
// 			{ id: 39, sets: 4, reps: 12, movementID: 36, workoutId: 6 },//Bulgarian Split Squat
// 			{ id: 40, sets: 4, reps: 10, movementID: 37, workoutId: 6 },//Front Squats
// 			{ id: 41, sets: 4, reps: 12, movementID: 38, workoutId: 6 },//Hip Thrusts
// 			{ id: 42, sets: 3, reps: 12, movementID: 18, workoutId: 6 },//Leg Curls	
// 			{ id: 43, sets: 4, reps: 12, movementID: 39, workoutId: 6 },//1 Legged Leg Press

// 		],
// 		skipDuplicates: true,
// 	})

// }

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})