import {
	format,
	startOfWeek,
	addDays,
	startOfMonth,
	endOfMonth,
	endOfWeek,
	isSameMonth,
	isSameDay,
	parseISO
} from 'date-fns'

import Link from 'next/link'

import { useAppSelector } from '@app/hooks'
import { selectActiveDate, selectWorkouts, selectCardioList } from '@features/calendar/CalendarSlice'
import { PreviousCardio } from '@server/getPreviousCardio'
import { PreviousWorkoutsEntry } from '@server/getPreviousWorkouts'


const CalendarDates = () => {
	const activeDate = new Date(useAppSelector(selectActiveDate))

	const previousWorkouts = useAppSelector(selectWorkouts)
	const previousCardio = useAppSelector(selectCardioList)

	const startOfTheSelectedMonth = startOfMonth(activeDate)
	const endOfTheSelectedMonth = endOfMonth(activeDate)
	const startDate = startOfWeek(startOfTheSelectedMonth)
	const endDate = endOfWeek(endOfTheSelectedMonth)

	let currentDate = startDate

	const allWeeks = []

	while (currentDate <= endDate) {
		allWeeks.push(
			Week(currentDate, activeDate, previousWorkouts, previousCardio)
		)
		currentDate = addDays(currentDate, 7)
	}

	return <tbody>{allWeeks}</tbody>
}


const Week = (date: Date, activeDate: Date, previousWorkouts: PreviousWorkoutsEntry[], previousCardio: PreviousCardio[]) => {
	let currentDate = date
	const week = []

	for (let day = 0; day < 7; day++) {

		const workoutThisDay = previousWorkouts.find(workout => isSameDay(parseISO(workout.date), currentDate))
		if (workoutThisDay) console.log(workoutThisDay)
		const cardioThisDay = previousCardio.find(cardio => isSameDay(parseISO(cardio.timeCreated), currentDate))
		week.push(
			<td key={day}
				className={`${isSameMonth(activeDate, currentDate) ? 'text-white bg-slate-500' : 'text-slate-500'} 
			text-center pb-6 outline outline-white outline-1 text-l font-heavy rounded-sm`}
			>
				<div className='grid grid-rows-2'>
					<span className='flex flex-col'>
						<span className={`${workoutThisDay ? 'bg-green-600' : 'opacity-100'} h-4`}></span>
						<span className={`${cardioThisDay ? 'bg-purple-600' : 'opacity-100'} h-4`}></span>
					</span>
					<Link href={`${workoutThisDay ? `/previous-workouts/${workoutThisDay?.id}` : ''}`}>
						<span className={`${isSameDay(currentDate, new Date()) ? 'text-red-700' : ''}`}>
							{format(currentDate, 'dd')}
						</span>
					</Link>
				</div>
			</td>
		)
		currentDate = addDays(currentDate, 1)
	}
	return <tr key={currentDate.toISOString()}>{week}</tr>
}

export default CalendarDates