import React from 'react'
import { useAppSelector } from '@app/hooks'
import { selectPreviousExerciseEntries, selectActiveEntry } from '@features/exercise/exerciseSlice'
import { format } from 'date-fns'
import Card from '@components/Card'

const PrevExercise = () => {
	//get the list of all of the exercises of the previous workout
	const previousExercises = useAppSelector(selectPreviousExerciseEntries)
	//get the id of the active exercise entry that we are on
	const exerciseId = useAppSelector(selectActiveEntry)

	//find the info about the last time that this exercise was completed
	const activePrevExercise = previousExercises
		? previousExercises.find(item => item.exerciseID === exerciseId)
		: null

	return (
		<div className='text-white text-center my-4'>
			{activePrevExercise ?
				<Card title='Previous Workouts'>
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
								<td>{format(new Date(), 'MMM  dd yyyy')}</td>
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
									{activePrevExercise.weights.map((weight, i) => (

										<td key={i}>{weight} lbs</td>

									))}
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