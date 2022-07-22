import React from 'react'
import { useAppSelector } from '@app/hooks'
import { selectPreviousExerciseEntries, selectActiveEntry } from '@features/exercise/exerciseSlice'
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
					<div className='grid grid-cols-2 mt-4'>
						<div>
							<span className='outline outline-white rounded-xl px-4 font-bold text-m block w-3/4 lg:w-1/2 mx-auto'>
								Order <br /> {activePrevExercise.order}
							</span>
						</div>
						<p>
							<span className='outline outline-white rounded-xl px-4 font-bold text-m block w-3/4 lg:w-1/2 mx-auto'>
								Intensity <br /> {activePrevExercise.intensity}
							</span>
						</p>
					</div>
					<hr className='my-6 block w-11/12 mx-auto' />
					<div className=' w-11/12 mx-auto mt-4'>
						<strong className='text-xl'>Weights</strong>
						<table className='w-full mt-4'>
							<thead>
								<tr>
									{activePrevExercise.weights.map((_, i) => (<th className='bg-cyan-700' key={i}>{i + 1}</th>))}
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
							<hr className='my-6 block w-11/12 mx-auto' />
							<strong className='my-8'>
								<span className='text-xl'>Previous Notes</span>
								<p className='text-m'>
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