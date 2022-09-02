import React, { useEffect } from 'react'

import { selectStatus, selectWorkout, getWorkoutDataAsync } from '@features/history/PreviousWorkoutSlice'

import { format } from 'date-fns'

import Loading from '@components/Loading'
import Layout from '@components/Layout'
import Card from '@components/Card'
import SignIn from '@components/SignIn'
import Fail from '@components/Fail'
import BackBtn from '@components/BackBtn'

import router from 'next/router'

import { useSession } from 'next-auth/react'

import { useAppSelector, useAppDispatch } from '@app/hooks'


const PreviousWorkout = () => {
	const pageStatus = useAppSelector(selectStatus)
	const dispatch = useAppDispatch()
	const { status } = useSession()
	const workout = useAppSelector(selectWorkout)

	useEffect(() => {
		const params = router.query
		if (params.previousWorkout) dispatch(getWorkoutDataAsync(Number(params.previousWorkout)))
	}, [router.query])

	if (pageStatus === 'loading' || status === 'loading') return <Layout><Loading /></Layout>
	else if (status === 'unauthenticated') return <SignIn />
	else if (pageStatus === 'failed') return <Layout><Fail /></Layout>

	return (
		<Layout title='Workout' >
			<div className='grid grid-cols-5 my-4'>
				<BackBtn href={'/calendar'} />
				<span className='text-white'> [WIP] include trash button here</span>
			</div>

			<Card title={`Workout Id :${workout.id}`}>
				<h2 className='text-white'>{`Completed: ${format(new Date(workout.date), 'EEE, LLL dd YYY hh:mm aa')}`}</h2>
				<div className='text-center my-6'>
					{workout.notes &&
						<>
							<h3 className='text-white'>Notes</h3>
							<div >
								{workout.notes}
							</div>
						</>
					}
				</div>
			</Card>
		</Layout>
	)
}

export default PreviousWorkout