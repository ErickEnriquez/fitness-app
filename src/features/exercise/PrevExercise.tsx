import React from 'react'
import { useAppSelector } from '@app/hooks'
import { selectPreviousExerciseEntries, selectActiveEntry } from '@features/exercise/exerciseSlice'


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
				<>
					<h3 className='underline text-2xl'>Previous Info</h3>
					<p>Previous Order : {activePrevExercise.order}</p>
					<p>Previous Intensity : {activePrevExercise.intensity}</p>
					<p>Previous Notes : {activePrevExercise.notes}</p>
					<ul>Previous Weight Amounts:
						{activePrevExercise.weights.map((item, idx) => {
							return (
								<li key={idx}>Set {idx + 1} : {item}</li>
							)
						})}
					</ul>
				</>
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