import { format, startOfWeek, addDays } from 'date-fns'

const CalendarWeekDays = ({ activeDate }: { activeDate: Date }) => {
	const weekStartDate = startOfWeek(activeDate)
	const weekDays = []
	for (let day = 0; day < 7; day++) {
		weekDays.push(
			<td className="text-white text-center">
				{format(addDays(weekStartDate, day), 'E')}
			</td>
		)
	}
	return <tr >{weekDays}</tr>
}

export default CalendarWeekDays