
import { format, subMonths, addMonths } from 'date-fns'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { selectActiveDate, editSelectedDate, editActiveDate } from '@features/calendar/CalendarSlice'
import { parseISO } from 'date-fns'

const CalendarHeader = () => {

	const dispatch = useAppDispatch()
	const active = new Date(useAppSelector(selectActiveDate))

	console.log(active)
	return (
		<div className="text-white w-11/12 mx-auto flex justify-evenly	mt-4 bg-slate-500 py-2 rounded-xl">
			<h3
				className='hover:cursor-pointer'
				onClick={() => {
					dispatch(editSelectedDate(new Date().toISOString()))
					dispatch(editActiveDate(new Date().toISOString()))
				}}
			>Today
			</h3>
			<AiOutlineLeft
				onClick={() => dispatch(editActiveDate(subMonths(active, 1).toISOString()))}
				className="hover:cursor-pointer font-heavy"
			/>
			<AiOutlineRight
				onClick={() => dispatch(editActiveDate(addMonths(active, 1).toISOString()))}
				className="hover:cursor-pointer font-heavy"
			/>
			<h2 className="currentMonth">{format(active, 'MMMM yyyy')}</h2>
		</div>
	)
}

export default CalendarHeader