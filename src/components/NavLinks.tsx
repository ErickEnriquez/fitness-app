import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { useAppDispatch } from '@app/hooks'

import { resetState as resetExercise } from '@features/exercise/exerciseSlice'
import { resetState as resetCalendar } from '@features/calendar/CalendarSlice'
import { resetState as resetCardio } from '@features/cardio/CardioSlice'
import { resetState as resetPrevWorkout } from '@features/history/PreviousWorkoutSlice'

const NavLinks = () => {
	const dispatch = useAppDispatch()
	return (
		<>
			<NavLink url={'/'} name={'Home'} />
			<NavLink url={'/workout'} name={'Workouts'} />
			<NavLink url={'/calendar'} name={'Calendar'} />
			<NavLink url={'/cardio'} name={'Cardio'} />
			<button className='font-bold mt-24 mx-0 pt-0 sm:pt-1 sm:mt-2 sm:mx-6 flex flex-col rounded-xl hover:underline' onClick={
				() => {
					dispatch(resetCardio())
					dispatch(resetCalendar())
					dispatch(resetExercise())
					dispatch(resetPrevWorkout())
					signOut()
				}}>Sign out
			</button>
		</>
	)
}

const NavLink = ({ url, name }: { url: string, name: string }) => {
	const router = useRouter()
	return (
		<Link href={url}>
			<a className={`font-bold my-4 mx-0 sm:mx-6 flex flex-col rounded-xl hover:underline ${url === router.pathname ? 'bg-white text-primary-blue py-1' : ''}`} >
				{name}
			</a>
		</Link>
	)
}

export default NavLinks