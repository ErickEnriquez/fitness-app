
import { format, subMonths, addMonths } from 'date-fns'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface props {
	activeDate: Date
	setActiveDate: (date: Date) => void
	setSelectedDate: (date: Date) => void
}

const CalendarHeader = ({ activeDate, setActiveDate, setSelectedDate }: props) => {
	return (
		<div className="text-white w-11/12 mx-auto flex justify-evenly	mt-4 bg-slate-500 py-2 rounded-xl">
			<h3
				className='hover:cursor-pointer'
				onClick={() => {
					setSelectedDate(new Date())
					setActiveDate(new Date())
				}}
			>Today
			</h3>
			<AiOutlineLeft
				onClick={() => setActiveDate(subMonths(activeDate, 1))}
				className="hover:cursor-pointer font-heavy"
			/>
			<AiOutlineRight
				onClick={() => setActiveDate(addMonths(activeDate, 1))}
				className="hover:cursor-pointer font-heavy"
			/>
			<h2 className="currentMonth">{format(activeDate, 'MMMM yyyy')}</h2>
		</div>
	)
}

export default CalendarHeader