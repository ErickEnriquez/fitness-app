import React from 'react'

import Layout from '@features/layout/Layout'
import CalendarSection from '@features/calendar/CalendarSection'
import Loading from '@features/loading/Loading'

import {  useAppSelector } from '@app/hooks'
import { selectStatus } from '@features/calendar/CalendarSlice'

const Calendar = () => {
	const status = useAppSelector(selectStatus)
	//grab the workout templates from the server on page load

	if (status === 'loading') return <Layout><Loading /></Layout>

	return (
		<Layout>
			<CalendarSection />
		</Layout>
	)
}

export default Calendar