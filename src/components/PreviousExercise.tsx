import { PreviousExercise } from '@features/history/PreviousWorkoutSlice'
import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'

const PreviousExercise = ({ exercise }: { exercise: PreviousExercise }) => {
	return (
		<div className='w-11/12 mx-auto bg-light-gray py-1 mt-2 mb-6 rounded-xl'>
			<div className='bg-primary-blue grid grid-cols-3 w-5/6 mx-auto rounded-xl my-2'>
				<p className='text-white'>{exercise.order}.</p>
				<strong className='text-white'>{exercise.name}</strong>
				<span className='w-11/12 mx-auto'>
					<FaPencilAlt
						color='#FFF'
						style={{ 'display': 'unset', 'verticalAlign': 'unset' }}
						onClick={() => { alert('Edit') }}
					/>
				</span>
			</div>
			<div className='grid-cols-5 grid text-white w-11/12 mx-auto'>
				<strong>Set</strong>
				<strong className='col-span-2'>Weight</strong>
				<strong className='col-span-2'>Reps</strong>
			</div>
			<ul className='grid-cols-5 grid text-white w-11/12 mx-auto'>
				{exercise.weights.map((weight, idx) => (
					<React.Fragment key={idx}>
						<li className='text-primary-blue bg-white w-1/4 mx-auto rounded-xl pb-2'>{idx + 1}</li>
						<li className='col-span-2'>{weight}</li>
						<li className='col-span-2'>{exercise.reps}</li>
					</React.Fragment>
				))}
			</ul>
			<div className='grid grid-cols-2 bg-white rounded-xl w-5/6 mx-auto my-4'>
				<strong className='text-primary-blue'>Intensity</strong>
				<strong className='text-primary-blue'>Order</strong>
			</div>
			<div className='grid grid-cols-2 rounded-xl w-3/4 mx-auto my-4'>
				<strong className='text-white'>{exercise.intensity}</strong>
				<strong className='text-white'>{exercise.order}</strong>
			</div>
			{exercise.notes &&
				<div className='w-5/6 mx-auto'>
					<strong className='text-white'>Notes</strong>
					<p className='text-white'>{exercise.notes}</p>
				</div>
			}
		</div>
	)
}

export default PreviousExercise