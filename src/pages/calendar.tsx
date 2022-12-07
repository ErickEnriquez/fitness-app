import React, { useEffect , useState} from 'react'

import {
	selectStatus, selectActiveDate, getWorkoutsAsync,
	selectCardioId, selectWorkoutId
} from '@features/calendar/CalendarSlice'

import CalendarHeader from '@features/calendar/Header'
import CalendarWeekDays from '@features/calendar/Weekdays'
import CalendarDates from '@features/calendar/CalendarDates'
import CalendarKey from '@features/calendar/CalendarKey'
import Layout from '@components/Layout'
import Card from '@components/Card'
import Modal from '@components/Modal'

import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '@app/hooks'

import { startOfMonth, endOfMonth } from 'date-fns'

const Calendar = () => {
	const pageStatus = useAppSelector(selectStatus)
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

	const router = useRouter()

	return (
		<Layout
			pageStatus={pageStatus}
			failHandler={() => {
				router.back()
			}}
		>
			<Card title='Calendar' style={{ textAlign: 'center' }}>
				<CalendarHeader />
				<table className="mx-auto w-11/12 mt-8">
					<CalendarWeekDays />
					<CalendarDates />
				</table>
				<CalendarKey />
			</Card>
			<Modal />
		</Layout>
	)
}

export default Calendar