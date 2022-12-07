import {
	startOfWeek,
	addDays,
	startOfMonth,
	endOfMonth,
	endOfWeek,
	isSameMonth,
	isSameDay,
	parseISO,
	format
} from 'date-fns'

import { useAppSelector , useAppDispatch} from '@app/hooks'
import { selectActiveDate, selectWorkouts, selectCardioList, editCardioId, editWorkoutId, toggleModal } from '@features/calendar/CalendarSlice'
import { SerializedCardio } from '@server/cardio/index'
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
			Week(currentDate, activeDate, previousWorkouts, previousCardio as SerializedCardio[])
		)
		currentDate = addDays(currentDate, 7)
	}

	return <tbody>{allWeeks}</tbody>
}


const Week = (date: Date, activeDate: Date, previousWorkouts: PreviousWorkoutsEntry[], previousCardio: SerializedCardio[]) => {
	let currentDate = date
	const week = []
	const dispatch = useAppDispatch()

	for (let day = 0; day < 7; day++) {

		const workoutThisDay = previousWorkouts.find(workout => isSameDay(parseISO(workout.date), currentDate))
		const cardioThisDay = previousCardio.find(cardio => isSameDay(parseISO(cardio.timeCreated), currentDate))
		week.push(
			<td key={day}
				className={`${isSameMonth(activeDate, currentDate) ? 'text-white bg-light-gray' : 'text-light-gray'} 
			text-center pb-6 outline outline-white outline-1 text-l font-heavy rounded-sm`}
			>
				<div className='grid grid-rows-2'
				>
					<span className='flex flex-col'>
						<span className={`${workoutThisDay ? 'bg-primary-green' : 'opacity-100'} h-4`}></span>
						<span className={`${cardioThisDay ? 'bg-primary-purple' : 'opacity-100'} h-4`}></span>
					</span>
					<span
						onClick={() => {
							if(workoutThisDay || cardioThisDay) dispatch(toggleModal())
							if (workoutThisDay) dispatch(editWorkoutId(workoutThisDay.id))
							if (cardioThisDay) dispatch(editCardioId(cardioThisDay.id))
						}}
						className={`${isSameDay(currentDate, new Date()) ? 'bg-primary-blue w-1/2 mx-auto rounded-lg' : ''}`}>
						{format(currentDate, 'dd')}
					</span>
				</div>
			</td>
		)
		currentDate = addDays(currentDate, 1)
	}
	return <tr key={currentDate.toISOString()}>{week}</tr>
}

export default CalendarDates