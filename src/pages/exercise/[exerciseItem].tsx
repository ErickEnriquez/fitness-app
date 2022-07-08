import React, { useState } from 'react'
import Layout from '@features/layout/Layout'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import PrevExercise from '@features/exercise/PrevExercise'
import { editWeight, editNotes, editIntensity, editOrder, selectActiveEntry, toggleExerciseComplete } from '@features/exercise/exerciseSlice'
import Notes from '@components/Notes'
import NumberInput from '@components/NumberInput'

const ExerciseItem = () => {
	const dispatch = useAppDispatch()
	const activeExerciseId = useAppSelector(selectActiveEntry)

	//grab the active exercise exerciseEntry from the store
	const exerciseEntry = useAppSelector(state => state.exercise.entries.find(elem => elem.id === activeExerciseId))

	const [previousInfo, setPreviousInfo] = useState(false)

	//check if all of the weight entries are completed and if so, mark the exercise as complete
	const toggleCompleted = () => {
		//if all entries are not empty and we are false change to true
		if (!exerciseEntry.completed && exerciseEntry.weights.every(weight => weight)) {
			dispatch(toggleExerciseComplete(exerciseEntry.id))
		}
		//if some entries get deleted change the completed to false
		else if (exerciseEntry.completed && exerciseEntry.weights.some(weight => !weight)) {
			dispatch(toggleExerciseComplete(exerciseEntry.id))
		}
	}

	return (
		<Layout>
			<main>
				{exerciseEntry ?
					<div>
						<div className='grid grid-cols-4 my-4'>
							<Link href={`/workout/${exerciseEntry.workoutId}`}>
								<span className="flex items-center">
									<a onClick={toggleCompleted}
										className={`
									text-center bg-orange-500 px-8 rounded-full w-3/4 mx-auto text-white shadow-lg shadow-black/70 
									hover:outline-orange-500 hover:outline hover:bg-white hover:text-orange-500
									flex items-center justify-center h-10 font-bold
									`}
									>Back
									</a>
								</span>
							</Link>
							<h2 className='mx-auto1 text-white text-center col-span-2'>
								<span className='text-3xl font-bold'>
									{exerciseEntry.name}
								</span>
								<br />
								Sets {exerciseEntry.sets}x{exerciseEntry.reps}
							</h2>
						</div>
						<hr className='block mx-auto w-11/12 mb-2' />
						<div className="bg-slate-700 rounded-3xl content-center w-11/12 mx-auto">
							<h3 className='text-center text-white text-xl font-bold'>Weight (lbs)</h3>
							<div className='grid grid-cols-2 py-4  md:grid-cols-2 lg:grid-cols-5 '>
								{exerciseEntry.weights.map((weight, i: number) => (
									<NumberInput
										key={i}
										color={'outline-orange-700'}
										name='weight'
										num={weight}
										changeHandler={(e) => dispatch(editWeight({ movementID: exerciseEntry.movementID, value: Number(e.target.value), setNumber: i }))}
									/>
								))}
							</div>
						</div>
						<div className="bg-slate-700 rounded-3xl py-4 my-4 w-11/12 mx-auto">
							<h3 className='text-center text-white text-xl mb-4 font-bold'>Intensity & Order</h3>
							<div className="grid grid-cols-2 content-center ">
								<NumberInput
									name='Order' num={exerciseEntry.order}
									changeHandler={(e) => dispatch(editOrder({ movementID: exerciseEntry.movementID, value: Number(e.target.value) }))}
								/>
								<NumberInput
									name='Intensity' num={exerciseEntry.intensity}
									color={'outline-purple-600'}
									changeHandler={(e) => dispatch(editIntensity({ movementID: exerciseEntry.movementID, value: Number(e.target.value) }))}
								/>
							</div>
						</div>
						<div className='bg-slate-700 rounded-3xl w-11/12 mx-auto align-center flex flex-col py-4'>
							<Notes
								val={exerciseEntry.notes}
								changeHandler={(e) => dispatch(editNotes({ movementID: exerciseEntry.movementID, value: e.target.value }))}
							/>
						</div>
						<button className='bg-cyan-500 rounded-full mx-auto block my-8 w-11/12 py-3 text-white font-bold' onClick={() => setPreviousInfo(prev => !prev)}> Show Previous Workout</button>
						{previousInfo && <PrevExercise />}
					</div>
					:
					(<div>
						<h1 className='text-white text-3xl text-center'>No exerciseEntry selected</h1>
						<Link href='/workout'>
							<button className='bg-white text-cyan-500 rounded-full' >Back to Workouts</button>
						</Link>
					</div>
					)
				}
			</main>
		</Layout >
	)
}

export default ExerciseItem