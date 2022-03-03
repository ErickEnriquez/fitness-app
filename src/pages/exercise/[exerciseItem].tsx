import React from 'react'
import Layout from '@features/layout/Layout'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@app/hooks'

import { editWeight, editNotes, editIntensity, editOrder, selectActiveEntry, toggleExerciseComplete } from '@features/exercise/exerciseSlice'

const ExerciseItem = () => {
	const dispatch = useAppDispatch()
	const activeExerciseId = useAppSelector(selectActiveEntry)

	//grab the active exercise exerciseEntry from the store
	const exerciseEntry = useAppSelector(state => state.exercise.entries.find(elem => elem.id === activeExerciseId))

	return (
		<Layout>
			<main>
				{exerciseEntry ?
					<div>
						<div className='grid grid-cols-4 my-6'>
							<Link href={`/workout/${exerciseEntry.workoutId}`}>
								<span className="flex item-center">
									<a className='text-center bg-red-500 px-8 rounded-full w-3/4 mx-auto text-white hover:outline-red-500 hover:outline hover:bg-white hover:text-red-500'
									>Back
									</a>
								</span>
							</Link>
							<h2 className='mb-4 mx-auto1 text-white text-center col-span-2'>
								<span className='underline text-3xl'>
									{exerciseEntry.name}
								</span>
								<br />
								Sets {exerciseEntry.sets}x{exerciseEntry.reps}
							</h2>
						</div>
						<input
							type="number"
							placeholder='Order'
							className='outline my-1 outline-blue-700 outline-4 rounded-full placeholder:text-slate-600 text-center py-3 w-11/12 block mx-auto mb-10'
							value={exerciseEntry.order}
							onChange={(e) => dispatch(editOrder({
								movementID: exerciseEntry.movementID,
								value: Number(e.target.value)
							}))}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 content-center w-11/12 mx-auto">
							{exerciseEntry.weights.map((weight, i: number) => (
								<input
									key={i}
									type="number"
									value={weight}
									onChange={(e) => dispatch(editWeight({
										movementID: exerciseEntry.movementID,
										value: Number(e.target.value),
										setNumber: i
									}))}
									placeholder={`Weight for set ${i + 1}`}
									className='outline outline-orange-700 outline-4 rounded-full mx-2 py-3 mb-10 lg:mb-0 placeholder:text-slate-600 text-center '
								/>
							))}
						</div>
						<div className="mt-4 grid gap-7 grid-cols-1 md:grid-cols-2 content-center w-11/12 mx-auto">
							<input
								type="text"
								placeholder='Notes'
								className='outline my-1 outline-yellow-400 outline-4 rounded-full placeholder:text-slate-600 text-center py-3'
								value={exerciseEntry.notes}
								onChange={(e) => dispatch(editNotes({
									movementID: exerciseEntry.movementID,
									value: e.target.value
								}))}
							/>
							<input
								type="number"
								placeholder='Intensity 0-10'
								className='outline my-1 outline-purple-600 outline-4 rounded-full placeholder:text-slate-600 text-center py-3'
								value={exerciseEntry.intensity}
								min={0}
								max={10}
								onChange={(e) => dispatch(editIntensity({
									movementID: exerciseEntry.movementID,
									value: Number(e.target.value)
								}))}
							/>
						</div>

						<button className={exerciseEntry.completed ? 'bg-red-500 rounded-full mx-auto block mt-8 w-11/12 py-3 text-white' : 'bg-green-500 rounded-full mx-auto block mt-8 w-11/12 py-3 text-white'}
							onClick={() => dispatch(toggleExerciseComplete(exerciseEntry.id))}
						>
							{exerciseEntry.completed ? 'Cancel' : 'Complete'}
						</button>
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
		</Layout>
	)
}

export default ExerciseItem