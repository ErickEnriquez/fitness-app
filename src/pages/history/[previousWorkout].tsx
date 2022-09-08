import React, { useEffect } from 'react'

import {
	selectStatus,
	selectWorkout, getWorkoutDataAsync,
	selectExercises, selectChanged,
	deleteWorkout, updateData
} from '@features/history/PreviousWorkoutSlice'

import { format } from 'date-fns'

import Layout from '@components/Layout'
import Card from '@components/Card'
import Button from '@components/util/Button'
import PreviousExercise from '@features/history/PreviousExercise'

import { FaTrash } from 'react-icons/fa'

import router from 'next/router'
import Link from 'next/link'

import { useAppSelector, useAppDispatch } from '@app/hooks'
import { Decimal } from '@prisma/client/runtime'


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
			successHandler={() => router.push('/')}
		>
			<div className='grid grid-cols-5 my-4'>
				<Link href={'/calendar'}>
					<Button text='back' color='primary-blue' />
				</Link>
				<span
					className='bg-primary-red px-8 rounded-full w-3/4 mx-auto shadow-lg shadow-black/70  text-white
								hover:outline-primary-red hover:outline hover:bg-white hover:text-primary-red
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
					{isEdited && (
						< Button
							color='primary-green'
							text='Submit'
							clickHandler={() => { dispatch(updateData()) }}
						/>)
					}
				</Card>
			}
		</Layout >
	)
}

export default PreviousWorkout