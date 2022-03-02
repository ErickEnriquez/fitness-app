import React from 'react'
// import Loading from '@features/loading/Loading'
import Layout from '@features/layout/Layout'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@app/hooks'

import { editWeight, editNotes, editIntensity, editOrder, selectActiveEntry, selectStatus } from '@features/exercise/exerciseSlice'
import Loading from '@features/loading/Loading'

const ExerciseItem = () => {
	const dispatch = useAppDispatch()
	const activeExerciseId = useAppSelector(selectActiveEntry)
	const list = useAppSelector(state => state.exercise.entries)
	console.log(`${activeExerciseId} : is the active ID`)
	console.table(list)

	//grab the active exercise item from the store
	const item = useAppSelector(state => state.exercise.entries.find(elem => elem.id === activeExerciseId))
	const status = useAppSelector(selectStatus)


	if (status === 'loading') return <Loading />

	return (
		<Layout>
			<main>
				{item ?
					<div>
						<div className='grid grid-cols-4 my-6'>
							<Link href={`/workout/${item.workoutId}`}><span className="flex items-center "><a className='text-center bg-red-700 px-8 rounded-full w-3/4 mx-auto text-white hover:outline-red-700 hover:outline hover:bg-white hover:text-red-700'>Back</a></span></Link>
							<h2 className='mb-4 mx-auto1 text-white text-center col-span-2'><span className='underline text-3xl'>{item.name}</span> <br /> Sets {item.sets}x{item.reps}</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 content-center w-11/12 mx-auto">
							{item.weights.map((weight, i: number) => (
								<input
									key={i}
									type="number"
									value={weight}
									onChange={(e) => dispatch(editWeight({
										movementID: item.movementID,
										value: Number(e.target.value),
										setNumber: i
									}))}
									placeholder={`Weight for set ${i + 1}`}
									className='outline outline-orange-700 outline-4 rounded-full mx-2 py-3 mb-10 lg:mb-0 placeholder:text-slate-600 text-center '
								/>
							))}
						</div>
						<div className="mt-4 grid gap-7 grid-cols-1 md:grid-cols-3 content-center w-11/12 mx-auto">
							<input
								type="text"
								placeholder='Notes'
								className='outline my-1 outline-yellow-400 outline-4 rounded-full placeholder:text-slate-600 text-center py-3'
								value={item.notes}
								onChange={(e) => dispatch(editNotes({
									movementID: item.movementID,
									value: e.target.value
								}))}
							/>
							<input
								type="number"
								placeholder='Intensity 0-10'
								className='outline my-1 outline-purple-600 outline-4 rounded-full placeholder:text-slate-600 text-center py-3'
								value={item.intensity}
								min={0}
								max={10}
								onChange={(e) => dispatch(editIntensity({
									movementID: item.movementID,
									value: Number(e.target.value)
								}))}
							/>
							<input
								type="number"
								placeholder='Order'
								className='outline my-1 outline-blue-700 outline-4 rounded-full placeholder:text-slate-600 text-center py-3'
								value={item.order}
								onChange={(e) => dispatch(editOrder({
									movementID: item.movementID,
									value: Number(e.target.value)
								}))}
							/>
						</div>
					</div>
					:
					<div>
						<h1 className='text-white text-3xl text-center'>No item selected</h1>
						<Link href='/workout'>
							<button className='bg-white text-cyan-500 rounded-full' >Back to Workouts</button>
						</Link>
					</div>
				}
			</main>

		</Layout>
	)
}

export default ExerciseItem