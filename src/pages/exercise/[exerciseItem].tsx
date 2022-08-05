import React, { useState } from 'react'

import Layout from '@components/Layout'
import Notes from '@components/Notes'
import NumberInput from '@components/NumberInput'
import BackBtn from '@components/BackBtn'
import Loading from '@components/Loading'
import SignIn from '@components/SignIn'

import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import PrevWorkoutList from '@features/exercise/PrevWorkoutList'
import { editWeight, editNotes, editIntensity, editOrder, selectActiveEntry, toggleExerciseComplete } from '@features/exercise/exerciseSlice'

import { useSession } from 'next-auth/react'



const ExerciseItem = () => {

	const { data, status } = useSession()

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

	if (status === 'loading') return <Layout><Loading /></Layout>
	else if (status === 'unauthenticated') return <SignIn />
	return (
		<Layout>
			<main>
				{exerciseEntry ?
					<div>
						<div className='grid grid-cols-4 my-4'>
							<BackBtn href={`/workout/${exerciseEntry.workoutId}`} clickHandler={toggleCompleted} />
							<h2 className='mx-auto1 text-white text-center col-span-2 bg-slate-700 rounded-2xl'>
								<span className='text-3xl font-bold'>
									{exerciseEntry.name}
								</span>
								<br />
								Sets {exerciseEntry.sets}x{exerciseEntry.reps}
							</h2>
						</div>
						<br />
						<div className="bg-slate-700 rounded-3xl content-center w-11/12 mx-auto">
							<h3 className='text-center text-white text-xl font-bold'>Weight (lbs)</h3>
							<div className='grid grid-cols-2 py-4  md:grid-cols-2 lg:grid-cols-5 '>
								{exerciseEntry.weights.map((weight, i: number) => (
									<NumberInput
										key={i}
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
						<button className='bg-white rounded-full mx-auto block my-8 w-11/12 py-3 text-cyan-700 font-bold' onClick={() => setPreviousInfo(prev => !prev)}> Show Previous Workout</button>
						{previousInfo && <PrevWorkoutList />}
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