import React, { useEffect } from 'react'

import Layout from '@features/layout/Layout'
import Loading from '@components/Loading'
import CalendarHeader from '@features/calendar/CalendarHeader'
import CalendarWeekDays from '@features/calendar/CalendarWeekDays'
import CalendarDates from '@features/calendar/CalendarDates'
import Card from '@components/Card'

import { useAppSelector, useAppDispatch } from '@app/hooks'
import { selectStatus, selectActiveDate, getWorkoutsAsync } from '@features/calendar/CalendarSlice'

import { startOfMonth, endOfMonth } from 'date-fns'

const Calendar = () => {
	const status = useAppSelector(selectStatus)
	const active = useAppSelector(selectActiveDate)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(
			getWorkoutsAsync({
				start: startOfMonth(new Date(active)).toISOString(),
				end: endOfMonth(new Date(active)).toISOString()
			}))
	}, [])
	//grab the workout templates from the server on page load

	if (status === 'loading') return <Layout><Loading /></Layout>

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