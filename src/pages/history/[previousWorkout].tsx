import React, { useEffect } from 'react'

import { selectStatus, selectWorkout, getWorkoutDataAsync, selectExercises, selectChanged, deleteWorkout } from '@features/history/PreviousWorkoutSlice'

import { format } from 'date-fns'

import Layout from '@components/Layout'
import Card from '@components/Card'
import BackBtn from '@components/BackBtn'
import PreviousExercise from '@components/PreviousExercise'

import { FaTrash } from 'react-icons/fa'

import router from 'next/router'


import { useAppSelector, useAppDispatch } from '@app/hooks'
import { Decimal } from '@prisma/client/runtime'
import SubmitBtn from '@components/SubmitBtn'


const PreviousWorkout = () => {
	const pageStatus = useAppSelector(selectStatus)
	const dispatch = useAppDispatch()
	const workout = useAppSelector(selectWorkout)

	const exerciseList = useAppSelector(selectExercises)
	const isEdited = useAppSelector(selectChanged)

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

	return (
		<Layout title='Workout'
			pageStatus={pageStatus}
			failHandler={() => router.push('/')}
		>
			<div className='grid grid-cols-5 my-4'>
				<BackBtn href={'/calendar'} />
				<span
					className='bg-red-500 px-8 rounded-full w-3/4 mx-auto shadow-lg shadow-black/70  text-white
								hover:outline-red-500 hover:outline hover:bg-white hover:text-red-500
								flex items-center justify-center h-10 font-bold col-start-5'
					onClick={() => {
						const r = window.confirm('Are you sure you want to delete workout? THIS CANNOT BE UNDONE')
						if (!r) return
						dispatch(deleteWorkout())
					}}
				>
					<FaTrash style={{ 'display': 'unset', 'verticalAlign': 'unset' }} />
				</span>
			</div>
			{workout &&
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
					< SubmitBtn isDisabled={!isEdited} clickHandler={() => alert('Submit Changes')} />
				</Card>
			}
		</Layout >
	)
}

export default PreviousWorkout