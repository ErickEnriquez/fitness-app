import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	//write you seed data here

	const movements = await prisma.movement.createMany({
		data: [
			//push heavy
			{ name: 'Bench Press' },
			{ name: 'Incline Bench Press' },
			{ name: 'Decline Bench Press' },
			{ name: 'Machine Flys' },
			{ name: 'Dips' },
			{ name: 'Shoulder Press' },
			{ name: 'Tricep Pulldowns' },
			//pull heavy
			{ name: 'Deadlift' },
			{ name: 'Bent Over Row' },
			{ name: 'Pullups' },
			{ name: 'Cable Curl' },
			{ name: 'Standing Dumbbell Shrug' },
			{ name: 'Machine High Row' },
			{ name: 'Seated Rows' },
			//legs heavy
			{ name: 'Back Squat' },
			{ name: 'Leg Press' },
			{ name: 'Leg Extensions' },
			{ name: 'Leg Curls' },
			{ name: 'Romanian Deadlift' },
			{ name: 'Lunges' },
			{ name: 'Butt Raises' },
			//push light
			{ name: 'Incline Dumbbell Press' },
			{ name: 'Military Press' },
			{ name: 'Narrow Grip Bench Press' },
			{ name: 'Skull Crushers' },
			{ name: '1 Arm Tricep Pulldown' },
			{ name: 'Standing Cable Raises' },
			{ name: 'Seated Dips' },
			//pull light
			{ name: 'Sumo Deadlift' },
			{ name: 'Concentration Curls' },
			{ name: 'Incline Dumbbell Row' },
			{ name: 'Wide Grip Lat Pulldown' },
			{ name: 'Preacher Curls' },
			{ name: 'Front Raises' },
		]
	})

}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})