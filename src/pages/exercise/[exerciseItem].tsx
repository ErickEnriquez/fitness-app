import React from 'react'
// import Loading from '@features/loading/Loading'
import Layout from '@features/layout/Layout'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@app/hooks'

import { setWeight, editNotes, editIntensity, setOrder } from '@features/exercise/exerciseSlice'

const ExerciseItem = () => {
	const dispatch = useAppDispatch()
	const { activeEntry } = useAppSelector(state => state.exercise)

	console.log(activeEntry, 'test')
	return (
		<Layout>
			<main>
				{activeEntry &&
					<div>
						<Link href={`/workout/${activeEntry.workoutId}`}><a className='text-white'>Back</a></Link>
						<strong className='text-white'>{activeEntry.name}</strong>
						<h5 className='mb-4 mx-auto1 text-white'>Sets {activeEntry.sets}x{activeEntry.reps}</h5>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 content-center w-11/12 mx-auto">
							{activeEntry.weights.map((weight, i: number) => (
								<input
									key={i}
									type="number"
									value={weight}
									onChange={(e) => dispatch(setWeight({
										movementID: activeEntry.movementID,
										value: Number(e.target.value),
										setNumber: i
									}))}
									placeholder={`Weight for set ${i + 1}`}
									className='outline outline-orange-700 outline-4 rounded-full mx-2 mb-4 lg:mb-0 placeholder:text-slate-600 text-center '
								/>
							))}
						</div>
						<div className="mt-4 grid gap-7 grid-cols-1 md:grid-cols-3 content-center w-11/12 mx-auto">
							<input
								type="text"
								placeholder='Notes'
								className='outline my-1 outline-yellow-400 outline-4 rounded-full placeholder:text-slate-600 text-center'
								value={activeEntry.notes}
								onChange={(e) => dispatch(editNotes({
									movementID: activeEntry.movementID,
									value: e.target.value
								}))}
							/>
							<input
								type="number"
								placeholder='Intensity 0-10'
								className='outline my-1 outline-purple-600 outline-4 rounded-full placeholder:text-slate-600 text-center'
								value={activeEntry.intensity}
								min={0}
								max={10}
								onChange={(e) => dispatch(editIntensity({
									movementID: activeEntry.movementID,
									value: Number(e.target.value)
								}))}
							/>
							<input
								type="number"
								placeholder='Order'
								className='outline my-1 outline-blue-700 outline-4 rounded-full placeholder:text-slate-600 text-center'
								value={activeEntry.order}
								onChange={(e) => dispatch(setOrder({
									movementID: activeEntry.movementID,
									value: Number(e.target.value)
								}))}
							/>
						</div>
					</div>
				}
			</main>
		</Layout>
	)
}

export default ExerciseItem