import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import {
	selectPreviousExerciseEntries,
	selectActiveEntry,
	getMorePreviousWorkouts,
	removePreviousWorkout,
	selectStatus
} from '@features/exercise/ExerciseSlice'



import Card from '@components/Card'
import Button from '@components/util/Button'
import PreviousWorkoutItem from './PreviousWorkoutItem'
import { Prisma } from '@prisma/client'
import Loading from '@components/Loading'

const PrevWorkoutsList = () => {
	//get the list of all of the exercises of the previous workout
	const previousWorkouts = useAppSelector(selectPreviousExerciseEntries)
	//get the id of the active exercise entry that we are on
	const exerciseId = useAppSelector(selectActiveEntry)

	const status = useAppSelector(selectStatus)
	const dispatch = useAppDispatch()
	const [skipAmount, setSkipAmount] = useState(1)


	const prevWorkoutsList = previousWorkouts ?
		previousWorkouts.map((workout, i) => {
			const previousWorkout = workout
				? workout.exercises.find(item => item.exerciseID === exerciseId)
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
			{previousWorkouts ?
				<Card title='Previous Workouts'>
					{prevWorkoutsList}
					{status === 'loading' ? <Loading /> : (
						<div className='grid grid-cols-2 w-11/12 mx-auto mt-4'>

							<Button
								clickHandler={() => {
									dispatch(getMorePreviousWorkouts(skipAmount))
									setSkipAmount(skipAmount + 1)
								}}
								text='More'
							/>
							<Button
								clickHandler={() => {
									dispatch(removePreviousWorkout())
									if (skipAmount <= 0) {
										return
									}
									setSkipAmount(skipAmount - 1)
								}}
								text='Less'
							/>
						</div>
					)}
				</Card>
				: (
					<h3 className='text-2xl'>
						No Previous Data
					</h3>
				)
			}
		</div>
	)
}

export default PrevWorkoutsList