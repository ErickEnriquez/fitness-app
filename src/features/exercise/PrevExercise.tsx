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
				<Card title='Previous Info'>
					<div className='grid grid-cols-2 mt-4'>
						<div>
							<span className='outline outline-white rounded-xl px-4 font-bold text-xl block w-3/4 lg:w-1/2 mx-auto'>
								Previous Order : {activePrevExercise.order}
							</span>
						</div>
						<p>
							<span className='outline outline-white rounded-xl px-4 font-bold text-xl block w-3/4 lg:w-1/2 mx-auto'>
								Previous Intensity : {activePrevExercise.intensity}
							</span>
						</p>
					</div>
					<hr className='my-6 block w-11/12 mx-auto' />
					<strong className='text-2xl'>Previous Weight Amounts:</strong>
					<ul className={'grid grid-cols-3'}>
						{activePrevExercise.weights.map((item, idx) => {
							return (
								<li
									className='my-4'
									key={idx}
								>
									<span className='outline outline-white rounded-xl px-4 font-bold text-xl block w-3/4 lg:w-1/2 mx-auto'>
										<p className='underline'>Set {idx + 1}</p> {item}
									</span>
								</li>
							)
						})}
					</ul>
					<hr className='my-6 block w-11/12 mx-auto' />
					{activePrevExercise.notes &&
						<strong className='my-8'>
							<span className='text-2xl'>Previous Notes:</span>
							<p className='text-xl'>
								{activePrevExercise.notes}
							</p>
						</strong>
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