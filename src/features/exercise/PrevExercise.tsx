import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import { selectPreviousExerciseEntries, selectActiveEntry, getMorePreviousWorkouts, selectPreviousWorkoutsState } from '@features/exercise/exerciseSlice'
import { format } from 'date-fns'
import Card from '@components/Card'
import Loading from '@components/Loading'

const PrevExercise = () => {
	const state = useAppSelector(selectPreviousWorkoutsState)
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
							<tr className='outline-cyan-700 outline bg-white text-cyan-700'>
								<th>Order</th>
								<th>Intensity</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{activePrevExercise.order}</td>
								<td>{activePrevExercise.intensity}</td>
								<td>{format(new Date(workout.date), 'MMM  dd yyyy')}</td>
							</tr>
						</tbody>
					</table>
					<div className=' w-11/12 mx-auto mt-4'>
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
							<br />
							<strong className='my-8'>
								<h5 className='text-xl text-white outline outline-cyan-700 rounded-xl w-11/12 mx-auto'> Notes</h5>
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

	if (state === 'loading') {
		return <Loading />
	}
	return (
		<div className='text-white text-center my-4'>
			{previousWorkouts ?
				<Card title='Previous Workouts'>
					{prevWorkoutsList}
					<br />
					<button className='bg-cyan-700 px-4 py-2 rounded-xl hover:bg-white hover:text-cyan-700 hover:outline hover:outline-cyan-700' onClick={() => {
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