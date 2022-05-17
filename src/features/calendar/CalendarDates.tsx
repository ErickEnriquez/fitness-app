import {
	format,
	startOfWeek,
	addDays,
	startOfMonth,
	endOfMonth,
	endOfWeek,
	isSameMonth,
	isSameDay
} from 'date-fns'

const generateDatesForCurrentWeek = (date: Date, selectedDate: Date, activeDate: Date, setSelectedDate: (date: Date) => void) => {
	let currentDate = date
	const week = []
	for (let day = 0; day < 7; day++) {
		week.push(
			<td className={`${isSameMonth(activeDate, currentDate) ? 'text-white bg-slate-500' : 'text-slate-500'}
			text-center py-6 outline outline-white outline-1 text-l font-heavy rounded-sm`}
			>
				{format(currentDate, 'd')}
			</td>
		)
		currentDate = addDays(currentDate, 1)
	}
	return <tr>{week}</tr>
}

interface props {
	activeDate: Date
	selectedDate: Date
	setSelectedDate: (date: Date) => void
}

const Dates = ({ activeDate, selectedDate, setSelectedDate }: props) => {
	const startOfTheSelectedMonth = startOfMonth(activeDate)
	const endOfTheSelectedMonth = endOfMonth(activeDate)
	const startDate = startOfWeek(startOfTheSelectedMonth)
	const endDate = endOfWeek(endOfTheSelectedMonth)

	let currentDate = startDate

	const allWeeks = []

	while (currentDate <= endDate) {
		allWeeks.push(
			generateDatesForCurrentWeek(currentDate, selectedDate, activeDate, setSelectedDate)
		)
		currentDate = addDays(currentDate, 7)
	}

	return <>{allWeeks}</>
}

export default Dates