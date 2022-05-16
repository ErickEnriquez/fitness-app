
import { format, subMonths, addMonths } from 'date-fns'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface props {
	activeDate: Date
	setActiveDate: (date: Date) => void
	setSelectedDate: (date: Date) => void
}

const CalendarHeader = ({ activeDate, setActiveDate, setSelectedDate }: props) => {
	return (
		<div className="text-white w-11/12 mx-auto flex justify-evenly	mt-4">
			<h3 onClick={() => {
				setSelectedDate(new Date())
				setActiveDate(new Date())
			}}
			>Today
			</h3>
			<AiOutlineLeft
				onClick={() => setActiveDate(subMonths(activeDate, 1))}
				className="navIcon"
			/>
			<AiOutlineRight
				onClick={() => setActiveDate(addMonths(activeDate, 1))}
				className="navIcon" />
			<h2 className="currentMonth">{format(activeDate, 'MMMM yyyy')}</h2>
		</div>
	)
}

export default CalendarHeader