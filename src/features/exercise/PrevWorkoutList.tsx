import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import {
	selectPreviousExerciseEntries,
	selectActiveEntry,
	removePreviousWorkout,
	selectStatus,
} from '@features/exercise/ExerciseSlice'
import { getMorePreviousWorkouts } from './thunks'

import Card from '@components/Card'
import Button from '@components/util/Button'
import PreviousWorkoutItem from './PreviousWorkoutItem'
import { Prisma } from '@prisma/client'
import Loading from '@components/Loading'

const PrevWorkoutsList = () => {

	const status = useAppSelector(selectStatus)
	const dispatch = useAppDispatch()
	const [skipAmount, setSkipAmount] = useState(1)


	const prevWorkoutsList = previousWorkouts ?
		previousWorkouts.map((workout, i) => {
			const previousWorkout = workout
				? workout.exercises.find(item => item.exerciseId === exerciseId)
				: null
			return (
				<React.Fragment key={i}>
					<PreviousWorkoutItem
						previousWorkout={{ ...previousWorkout, weights: previousWorkout.weights.map(w => w) as Prisma.Decimal[] }}
						workoutDate={workout.date}
					/>
				</React.Fragment>
			)
		})
		: null


	return (
		<div className='text-white text-center my-4'>
			<Card title='Previous Workouts'>
				<PreviousWorkoutsEntriesList />
				{status === 'loading' ?
					<Loading /> :
					(
						<div className='grid grid-cols-2 w-11/12 mx-auto mt-4'>
							<Button
								color='primary-blue'
								text='More'
								clickHandler={() => {
									dispatch(getMorePreviousWorkouts(skipAmount))
									setSkipAmount( prevAmount => prevAmount + 1)
								}}
							/>
							<Button
								color='primary-blue'
								text='Less'
								clickHandler={() => {
									dispatch(removePreviousWorkout())
									if (skipAmount <= 0) {
										return
									}
									setSkipAmount(prevAmount => prevAmount - 1)
								}}
							/>
						</div>
					)
				}
			</Card>
		</div>
	)
}

const PreviousWorkoutsEntriesList = () => {

	const previousWorkouts = useAppSelector(selectPreviousExerciseEntries)
	const exerciseId = useAppSelector(selectActiveEntry)
	return (
		<>
			{	previousWorkouts.map((workout, i) => {
				const previousWorkout =  workout?.exercises?.find(item => item.exerciseId === exerciseId)
				return (
					<React.Fragment key={i}>
						{previousWorkout ?
							<PreviousWorkoutItem
								previousWorkout={{ ...previousWorkout, weights: previousWorkout.weights.map(w => w) as Prisma.Decimal[] }}
								workoutDate={workout.date}
							/> : null
						}
						
					</React.Fragment>
				)
			})}
		</>
	)
}

export default PrevWorkoutsList