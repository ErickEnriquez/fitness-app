import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import { selectPreviousExerciseEntries, selectActiveEntry, getMorePreviousWorkouts } from '@features/exercise/exerciseSlice'
import { format } from 'date-fns'
import Card from '@components/Card'

const PrevExercise = () => {
	//get the list of all of the exercises of the previous workout
	const previousWorkouts = useAppSelector(selectPreviousExerciseEntries)
	//get the id of the active exercise entry that we are on
	const exerciseId = useAppSelector(selectActiveEntry)

	const dispatch = useAppDispatch()
	const [skipAmount, setSkipAmount] = useState(1)



	const prevWorkoutsList = previousWorkouts ?
		previousWorkouts.map((workout, i) => {
			const activePrevExercise = workout
				? workout.exercises.find(item => item.exerciseID === exerciseId)
				: null
			return (
				<React.Fragment key={i}>
					<table className='w-11/12 mx-auto mt-4'>
						<thead>
							<tr className='outline-cyan-700 outline'>
								<th>Order</th>
								<th>Intensity</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{activePrevExercise.order}</td>
								<td>{activePrevExercise.intensity}</td>
								{/* placeholder date value right now, replace with the actual date that the workout was completed  */}
								<td>{format(new Date(workout.date), 'MMM  dd yyyy')}</td>
							</tr>
						</tbody>
					</table>
					<div className=' w-11/12 mx-auto mt-4'>
						<strong className='text-xl'>Weight</strong>
						<table className='w-full mt-4'>
							<thead>
								<tr className='bg-cyan-700 border-collapse rounded-2xl'>
									{activePrevExercise.weights.map((_, i) => (<th key={i}>{i + 1}</th>))}
								</tr>
							</thead>
							<tbody>
								<tr>
									{activePrevExercise.weights.map((weight, i) => <td key={i}>{weight} lbs</td>)}
								</tr>
							</tbody>
						</table>
					</div>
					{activePrevExercise.notes &&
						<>
							<strong className='my-8'>
								<strong className='text-xl'> Notes</strong>
								<p className='text-m w-11/12 mx-auto mt-2'>
									{activePrevExercise.notes}
								</p>
							</strong>
						</>
					}
				</React.Fragment>
			)
		})
		: null
	

	return (
		<div className='text-white text-center my-4'>
			{previousWorkouts ?
				<Card title='Previous Workouts'>
					{prevWorkoutsList}
					<button onClick={() => {
						dispatch(getMorePreviousWorkouts(skipAmount))
						setSkipAmount(skipAmount + 1)
					}}> Load More</button>
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

export default PrevExercise