import React, { useState } from 'react'

import Layout from '@features/layout/Layout'
import CalendarHeader from '@features/calendar/calendarHeader'
import CalendarWeekDays from '@features/calendar/calendarWeekDays'
import Dates from '@features/calendar/dates'
const Calendar = () => {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [activeDate, setActiveDate] = useState(new Date())

	return (
		<Layout>
			<section>
				<CalendarHeader
					activeDate={activeDate}
					setActiveDate={setActiveDate}
					setSelectedDate={setSelectedDate}
				/>
				<table className="mx-auto w-11/12 mt-8">
					<CalendarWeekDays activeDate={activeDate} />
					<Dates
						activeDate={activeDate}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
					/>
				</table>
			</section>
		</Layout>
	)
}

export default Calendar