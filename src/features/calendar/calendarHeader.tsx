
import { format } from 'date-fns'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const CalendarHeader = ({ activeDate }: { activeDate: Date }) => {
	return (
		<div className="header">
			<div className="todayButton">Today</div>
			<AiOutlineLeft className="navIcon" />
			<AiOutlineRight className="navIcon" />
			<h2 className="currentMonth">{format(activeDate, 'MMMM yyyy')}</h2>
		</div>
	)
}

export default CalendarHeader