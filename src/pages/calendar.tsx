import React, { useEffect } from 'react'

import Loading from '@components/Loading'
import CalendarHeader from '@features/calendar/Header'
import CalendarWeekDays from '@features/calendar/Weekdays'
import CalendarDates from '@features/calendar/Month'
import Layout from '@components/Layout'
import Card from '@components/Card'
import SignIn from '@components/SignIn'

import { useSession } from 'next-auth/react'

import { useAppSelector, useAppDispatch } from '@app/hooks'
import { selectStatus, selectActiveDate, getWorkoutsAsync } from '@features/calendar/CalendarSlice'

import { startOfMonth, endOfMonth } from 'date-fns'



const Calendar = () => {
	const pageStatus = useAppSelector(selectStatus)
	const active = useAppSelector(selectActiveDate)
	const dispatch = useAppDispatch()
	const { data, status } = useSession()

	useEffect(() => {
		dispatch(
			getWorkoutsAsync({
				start: startOfMonth(new Date(active)).toISOString(),
				end: endOfMonth(new Date(active)).toISOString()
			}))
	}, [])
	//grab the workout templates from the server on page load

	if (pageStatus === 'loading' || status === 'loading') return <Layout><Loading /></Layout>
	else if(status === 'unauthenticated') return <SignIn />

	return (
		<Layout>
			<Card title='Calendar' style={{ textAlign: 'center' }}>
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