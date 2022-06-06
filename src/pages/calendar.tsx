import React, { useEffect } from 'react'

import Layout from '@features/layout/Layout'
import CalendarSection from '@features/calendar/CalendarSection'
import Loading from '@components/Loading'

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
			<CalendarSection />
		</Layout>
	)
}

export default Calendar