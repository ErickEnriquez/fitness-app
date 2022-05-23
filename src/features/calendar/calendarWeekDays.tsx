import { format, startOfWeek, addDays } from 'date-fns'

import { useAppSelector } from '@app/hooks'
import { selectActiveDate } from '@features/calendar/CalendarSlice'

const CalendarWeekDays = () => {
	const activeDate = useAppSelector(selectActiveDate)
	const weekStartDate = startOfWeek(new Date(activeDate))

	const weekDays = Array.from({ length: 7 }, (_, i) => i).map((day) => (
		<td className="text-white text-center" key={day}>
			{format(addDays(weekStartDate, day), 'E')}
		</td>
	))

	return (
		<thead >
			<tr>
				{weekDays}
			</tr>
		</thead >
	)
}

export default CalendarWeekDays