import React, { useEffect } from 'react'

import Layout from '@features/layout/Layout'
import CalendarHeader from '@features/calendar/CalendarHeader'
import CalendarWeekDays from '@features/calendar/CalendarWeekDays'
import CalendarDates from '@features/calendar/CalendarDates'
import Card from '@components/Card'

import { useAppDispatch, useAppSelector } from '@app/hooks'

import { getWorkoutsAsync, selectActiveDate, selectWorkouts } from '@features/calendar/CalendarSlice'


const Calendar = () => {

	// useEffect(() => {
	// 	getWorkoutsAsync()
	// }, [])

	return (
		<Layout>
			<Card title='Calendar'>
				<CalendarHeader />
				<table className="mx-auto w-11/12 mt-8">
					<CalendarWeekDays />
					<CalendarDates />
				</table>
			</Card>
		</Layout>
	)
}

export default Calendar