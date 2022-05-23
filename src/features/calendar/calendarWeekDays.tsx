import { format, startOfWeek, addDays } from 'date-fns'

const CalendarWeekDays = ({ activeDate }: { activeDate: Date }) => {
	const weekStartDate = startOfWeek(activeDate)
	const weekDays = []
	for (let day = 0; day < 7; day++) {
		weekDays.push(
			<td className="text-white text-center" key={day}>
				{format(addDays(weekStartDate, day), 'E')}
			</td>
		)
	}
	return (
		<thead >
			<tr>
				{weekDays}
			</tr>
		</thead >
	)
}

export default CalendarWeekDays