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
			<div className='w-11/12 mx-auto mt-4'>
				<div className=' bg-white outline-primary-blue text-primary-blue rounded-xl grid grid-cols-3'>
					<strong>Order</strong>
					<strong>Intensity</strong>
					<strong>Date</strong>
				</div>
				<div className='grid grid-cols-3'>
					<strong>{previousWorkout.order}</strong>
					<strong>{previousWorkout.intensity}</strong>
					<strong>{format(new Date(workoutDate), 'MM/dd/yyyy')}</strong>
				</div>
				<div className={`bg-primary-blue text-white rounded-xl grid grid-cols-${previousWorkout.weights.length} my-4`}>
					{previousWorkout.weights.map((_, i) => (<strong key={i}>{i + 1}</strong>))}
				</div>
				<div className={`rounded-xl grid grid-cols-${previousWorkout.weights.length}`}>
					{previousWorkout.weights.map((w, i) => (<strong key={i}>{w} lbs</strong>))}
				</div>
			</div>
			{previousWorkout.notes &&
				<div className='bg-light-gray w-11/12 mx-auto my-8 rounded-xl py-2'>
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