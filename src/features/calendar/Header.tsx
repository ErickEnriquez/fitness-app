
import { format, subMonths, addMonths, startOfMonth, endOfMonth } from 'date-fns'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { selectActiveDate, editSelectedDate, editActiveDate, getWorkoutsAsync } from '@features/calendar/CalendarSlice'
import { getWorkoutAsync } from '@features/exercise/exerciseSlice'

const Header = () => {
	const dispatch = useAppDispatch()
	const active = new Date(useAppSelector(selectActiveDate))

	return (
		<div className="text-white w-11/12 mx-auto flex justify-evenly	mt-4 bg-slate-500 py-2 rounded-xl">
			<h3
				className='hover:cursor-pointer'
				onClick={() => {
					dispatch(editSelectedDate(new Date().toISOString()))
					dispatch(editActiveDate(new Date().toISOString()))
					dispatch(
						getWorkoutsAsync({
							start: startOfMonth(new Date()).toISOString(),
							end: endOfMonth(new Date()).toISOString()
						})
					)
				}}
			>Today
			</h3>
			<AiOutlineLeft
				onClick={() => {
					dispatch(editActiveDate(subMonths(active, 1).toISOString()))
					dispatch(
						getWorkoutsAsync({
							start: startOfMonth(subMonths(active, 1)).toISOString(),
							end: endOfMonth(subMonths(active, 1)).toISOString()
						})
					)
				}}
				className="hover:cursor-pointer font-heavy"
			/>
			<AiOutlineRight
				onClick={() => {
					dispatch(editActiveDate(addMonths(active, 1).toISOString()))
					dispatch(
						getWorkoutsAsync({
							start: startOfMonth(addMonths(active, 1)).toISOString(),
							end: endOfMonth(addMonths(active, 1)).toISOString()
						})
					)
				}}
				className="hover:cursor-pointer font-heavy"
			/>
			<h2 className="currentMonth">{format(active, 'MMM yyyy')}</h2>
		</div>
	)
}

export default Header