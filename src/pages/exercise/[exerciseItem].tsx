import React, { useState } from 'react'

import Layout from '@components/Layout'
import Notes from '@components/Notes'
import NumberInput from '@components/NumberInput'
import Button from '@components/util/Button'

import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import PrevWorkoutList from '@features/exercise/PrevWorkoutList'
import { editWeight, editNotes, editIntensity, editOrder, selectActiveEntry, toggleExerciseComplete } from '@features/exercise/ExerciseSlice'
import Card from '@components/Card'

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const ExerciseItem = () => {

	const dispatch = useAppDispatch()
	const activeExerciseId = useAppSelector(selectActiveEntry)
	const exerciseEntryLength = useAppSelector(state => state.exercise.entries)
	//grab the active exercise exerciseEntry from the store
	const exerciseEntry = useAppSelector(state => state.exercise.entries.find(elem => elem.id === activeExerciseId))

	const [previousInfo, setPreviousInfo] = useState(false)
	const [showNotesInput, setShowNotesInput] = useState(false)	

	//check if all of the weight entries are completed and if so, mark the exercise as complete
	const toggleCompleted = () => {
		//if all entries are not empty and we are false change to true
		if (exerciseEntry.completed === false && exerciseEntry.weights.every(weight => !isNaN(weight) && String(weight) !== '')) {
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
					<>
						<div className='grid grid-cols-5 my-4'>
							<Link href={`/workout/${exerciseEntry.workoutId}`}>
								<a>
									<Button
										color='primary-blue'
										text='Back'
										// clickHandler={toggleCompleted}
									/>
								</a>
							</Link>
							<h2 className='mx-auto1 text-white text-center col-span-3 bg-dark-gray rounded-2xl'>
								<span className='text-3xl font-bold'>
									{exerciseEntry.name}
								</span>
								<br />
								Sets {exerciseEntry.sets}x{exerciseEntry.reps}
							</h2>
						</div>
						<Card title={'Weight (lbs)'}>
							<div className='grid grid-cols-2 py-4  md:grid-cols-2 lg:grid-cols-5 mx-auto w-11/12'>
								{exerciseEntry.weights.map((weight, i: number) => (
									<NumberInput
										key={i}
										name='weight'
										num={weight}
										changeHandler={(e) => dispatch(editWeight({ movementId: exerciseEntry.movementId, value: Number(e.target.value), setNumber: i }))}
										blurHandler={toggleCompleted}
									/>
								))}
							</div>
						</Card>
						<br />
						<Card title='Order & Intensity'>
							<div className="grid grid-cols-2 content-center mx-auto w-11/12 ">
								<select
									name="order"
									id=""
									className={`ring-4 ring-primary-blue 
										rounded-3xl placeholder:text-slate-600 text-center my-4 py-4 w-11/12 block mx-auto
										shadow-lg shadow-black/70 text-black`}
									onChange={(e) => dispatch(editOrder({ movementId: exerciseEntry.movementId, value: Number(e.target.value) }))}
									value={exerciseEntry.order}
								>
									<option value="">
										Order
									</option>
									{exerciseEntryLength.map((_, idx) => (
										<option
											className='ring-4 ring-primary-blue ring-inset rounded-3xl placeholder:text-slate-600 text-center my-4 py-3 w-11/12 block mx-auto shadow-lg shadow-black/70'
											key={idx + 1}
											value={idx + 1}
											
										>
											{idx + 1}
										</option>
									))}
								</select>
								<select
									name="order"
									id=""
									className={`ring-4 ring-primary-blue 
										rounded-3xl placeholder:text-slate-600 text-center my-4 py-4 w-11/12 block mx-auto
										shadow-lg shadow-black/70 text-black`}
									onChange={(e) => dispatch(editIntensity({ movementId: exerciseEntry.movementId, value: Number(e.target.value) }))}
									value={exerciseEntry.intensity}
								>
									<option value="">
										Intensity
									</option>
									{Array.from({length:10}).map((_, idx) => (
										<option
											className='ring-4 ring-primary-blue ring-inset rounded-3xl placeholder:text-slate-600 text-center my-4 py-3 w-11/12 block mx-auto shadow-lg shadow-black/70'
											key={idx + 1}
											value={idx + 1}
										>
											{idx + 1}
										</option>
									))}
								</select>
							</div>
						</Card>
						<br />
						<Card title='Notes' >
							{showNotesInput && (
								<>
									<Notes
										val={exerciseEntry.notes}
										changeHandler={(e) => dispatch(editNotes({ movementId: exerciseEntry.movementId, value: e.target.value }))}
									/>
									<span className='grid grid-cols-1 justify-items-center content-center mx-auto w-11/12 mt-8'>
										<AiOutlineMinus
											color='white'
											onClick={() => setShowNotesInput(state => !state)}
										/>
									</span>
								</>
							)
							}
							{!showNotesInput && (
								<span className='grid grid-cols-1 justify-items-center content-center mx-auto w-11/12 mt-4'>
									<AiOutlinePlus
										color='white'
										onClick={() => setShowNotesInput(state => !state)}
									/>
								</span>
							)}
						</Card>						
						<div className='my-4'>
							<Button color="primary-blue" text='Show Previous Workout'
								clickHandler={() => setPreviousInfo(prev => !prev)}
							/>
						</div>
						{previousInfo && <PrevWorkoutList />}
					</>
					:
					(<div>
						<h1 className='text-white text-3xl text-center'>No exerciseEntry selected</h1>
						<Link href='/workout'>
							<button className='bg-white text-primary-blue rounded-full' >Back to Workouts</button>
						</Link>
					</div>
					)
				}
			</main>
		</Layout >
	)
}

export default ExerciseItem