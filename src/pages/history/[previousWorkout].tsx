import React, { useEffect } from 'react'

import { selectStatus, selectWorkout, getWorkoutDataAsync, selectExercises } from '@features/history/PreviousWorkoutSlice'

import { format } from 'date-fns'

import Loading from '@components/Loading'
import Layout from '@components/Layout'
import Card from '@components/Card'
import SignIn from '@components/SignIn'
import Fail from '@components/Fail'
import BackBtn from '@components/BackBtn'
import PreviousExercise from '@components/PreviousExercise'

import { FaTrash } from 'react-icons/fa'

import router from 'next/router'

import { useSession } from 'next-auth/react'

import { useAppSelector, useAppDispatch } from '@app/hooks'
import { Decimal } from '@prisma/client/runtime'


const PreviousWorkout = () => {
	const pageStatus = useAppSelector(selectStatus)
	const dispatch = useAppDispatch()
	const { status } = useSession()
	const workout = useAppSelector(selectWorkout)

	const exerciseList = useAppSelector(selectExercises)

	const exercises = exerciseList && exerciseList.map((item, i) => (
		<React.Fragment key={item.id}>
			<PreviousExercise
				exercise={{
					...item,
					//convert to Decimal array to avoid typescript complaining about "mismatched types"
					weights: [...item.weights] as Decimal[]
				}}
				idx={i}
			/>
		</React.Fragment>
	))

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
				<span
					className='bg-red-500 px-8 rounded-full w-3/4 mx-auto shadow-lg shadow-black/70  text-white
								hover:outline-red-500 hover:outline hover:bg-white hover:text-red-500
								flex items-center justify-center h-10 font-bold col-start-5'
					onClick={() => {
						const r = window.confirm('Are you sure you want to delete workout, this cannot be undone')
						if (!r) return
						alert('TODO: DELETE THE WORKOUT')
						// dispatch(deleteWorkout())
					}}
				>
					<FaTrash style={{ 'display': 'unset', 'verticalAlign': 'unset' }} />
				</span>
			</div>

			<Card title={`Workout Id :${workout.id}`}>
				<h2 className='text-white'>{`Completed: ${format(new Date(workout.date), 'EEE, LLL dd YYY hh:mm aa')}`}</h2>
				{workout.notes &&

					<div className='text-center my-6'>
						<>
							<h3 className='text-white'>Notes</h3>
							<div className='bg-light-gray w-11/12 mx-auto text-white rounded-lg'>
								{workout.notes}
							</div>
						</>
					</div>
				}
				<div className='grid grid-cols-2 bg-primary-blue text-white w-3/4 mx-auto rounded-xl'>
					<strong>Intensity</strong>
					<strong>Pre-Workout</strong>
				</div>
				<div className='grid grid-cols-2 text-white text-center w-3/4 mx-auto'>
					<strong>{workout.grade}</strong>
					<strong>{workout.preWorkout ? 'Yes' : 'No'}</strong>
				</div>
				{exercises}
			</Card>
		</Layout >
	)
}

export default PreviousWorkout