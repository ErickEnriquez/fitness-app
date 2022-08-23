import {
	format,
	startOfWeek,
	addDays,
	startOfMonth,
	endOfMonth,
	endOfWeek,
	isSameMonth,
	isSameDay
} from 'date-fns'

import { useAppSelector, useAppDispatch } from '@app/hooks'
import { selectActiveDate, selectSelectedDate, editSelectedDate, selectWorkouts } from '@features/calendar/CalendarSlice'
import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit/dist/createAction'


const Month = () => {
	const activeDate = new Date(useAppSelector(selectActiveDate))
	const selectedDate = new Date(useAppSelector(selectSelectedDate))

	const workouts = useAppSelector(selectWorkouts)

	const dates = workouts.map(i => i.date)
	console.log(dates)
	const startOfTheSelectedMonth = startOfMonth(activeDate)
	const endOfTheSelectedMonth = endOfMonth(activeDate)
	const startDate = startOfWeek(startOfTheSelectedMonth)
	const endDate = endOfWeek(endOfTheSelectedMonth)

	let currentDate = startDate

	const allWeeks = []

	while (currentDate <= endDate) {
		allWeeks.push(
			generateDatesForCurrentWeek(currentDate, selectedDate, activeDate, editSelectedDate)
		)
		currentDate = addDays(currentDate, 7)
	}

	return <tbody>{allWeeks}</tbody>
}


const generateDatesForCurrentWeek = (date: Date, selectedDate: Date, activeDate: Date, editSelectedDate: ActionCreatorWithOptionalPayload<string, string>) => {
	const dispatch = useAppDispatch()

	let currentDate = date
	const week = []

	for (let day = 0; day < 7; day++) {
		week.push(
			<td key={day}
				className={`${isSameMonth(activeDate, currentDate) ? 'text-white bg-slate-500' : 'text-slate-500'}
			text-center py-6 outline outline-white outline-1 text-l font-heavy rounded-sm`}
			>
				{format(currentDate, 'd')}
			</td>
		)
		currentDate = addDays(currentDate, 1)
	}
	return <tr key={currentDate.toISOString()}>{week}</tr>
}

export default Month