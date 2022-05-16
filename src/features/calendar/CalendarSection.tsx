import React, { useState } from 'react'

import Layout from '@features/layout/Layout'
import CalendarHeader from '@features/calendar/calendarHeader'


const Calendar = () => {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [activeDate, setActiveDate] = useState(new Date())

	return (
		<Layout>
			<section></section>
			<CalendarHeader activeDate={activeDate} />
		</Layout>
	)
}

export default Calendar