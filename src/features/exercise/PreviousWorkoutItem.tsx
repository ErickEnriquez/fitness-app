import React from 'react'
import { format } from 'date-fns'
import { ExerciseEntry } from '@prisma/client'

interface props {
	previousWorkout: ExerciseEntry
	workoutDate: string
}

const PreviousWorkoutItem = ({ previousWorkout, workoutDate }: props) => {
	return (
		<>
			<table className='w-11/12 mx-auto mt-4'>
				<thead>
					<tr className='outline-primary-blue outline bg-white text-primary-blue'>
						<th>Order</th>
						<th>Intensity</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{previousWorkout.order}</td>
						<td>{previousWorkout.intensity}</td>
						<td>{format(new Date(workoutDate), 'MM/dd/yyyy')}</td>
					</tr>
				</tbody>
			</table>
			<div className=' w-11/12 mx-auto mt-4'>
				<table className='w-full mt-4'>
					<thead>
						<tr className='bg-primary-blue border-collapse rounded-2xl'>
							{previousWorkout.weights.map((_, i) => (<th key={i}>{i + 1}</th>))}
						</tr>
					</thead>
					<tbody>
						<tr>
							{previousWorkout.weights.map((weight, i) => <td key={i}>{weight} lbs</td>)}
						</tr>
					</tbody>
				</table>
			</div>
			{previousWorkout.notes &&
				<div className='outline-primary-blue outline w-3/4 mx-auto my-8 rounded-xl'>
					<strong className='my-8'>
						<h3 className='text-xl bg-white w-3/4 mx-auto rounded-xl text-primary-blue'> Notes</h3>
						<p className='text-m w-11/12 mx-auto mt-2'>
							{previousWorkout.notes}
						</p>
					</strong>
				</div>
			}
		</>
	)
}

export default PreviousWorkoutItem