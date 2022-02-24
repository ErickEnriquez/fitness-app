import React from 'react'

import { useAppDispatch, useAppSelector } from '@app/hooks'

import {
	//actions
	setWeight,
	setOrder,
	editNotes,
	editIntensity,
	//async actions
	//state grabbers
	selectEntries,
}
	from '@features/exercise/exerciseSlice'


const ExerciseList = () => {

	const dispatch = useAppDispatch()
	const exercises = useAppSelector(selectEntries)
	return (
		<>
			{exercises.map((item, idx) => {
				return (
					<li
						className='w-11/12 mx-auto'
						key={idx}
					>
						<strong>{item.name}</strong>
						<h5 className='mb-4 mx-auto1'>Sets {item.sets}x{item.reps}</h5>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 content-center">
							{item.weights.map((elem, i: number) => (
								<input
									key={i}
									type="number"
									value={elem}
									data-movement={item.movementID}
									data-set-number={i}
									onChange={(e) => dispatch(setWeight({
										movementID: Number(e.target.dataset.movement),
										value: Number(e.target.value),
										setNumber: Number(e.target.dataset.setNumber)
									}))}
									placeholder={`Weight for set ${i + 1}`}
									className='outline outline-orange-700 mx-2 mb-4 lg:mb-0'
								/>
							))}
						</div>
						<div className="mt-4 grid gap-7 grid-cols-1 md:grid-cols-3 content-center">
							<input
								type="text"
								placeholder='Notes'
								className='outline my-1 outline-yellow-400'
								data-movement={item.movementID}
								value={item.notes}
								onChange={(e) => dispatch(editNotes({
									movementID: Number(e.target.dataset.movement),
									value: e.target.value
								}))}
							/>
							<input
								type="number"
								placeholder='Intensity 0-10'
								className='outline my-1 outline-purple-600'
								data-movement={item.movementID}
								value={item.intensity}
								min={0}
								max={10}
								onChange={(e) => dispatch(editIntensity({
									movementID: Number(e.target.dataset.movement),
									value: Number(e.target.value)
								}))}
							/>
							<input
								type="number"
								placeholder='Order'
								className='outline my-1 outline-blue-700'
								data-movement={item.movementID}
								value={item.order}
								onChange={(e) => dispatch(setOrder({
									movementID: Number(e.target.dataset.movement),
									value: Number(e.target.value)
								}))}
							/>
						</div>
					</li>
				)
			})
			}
		</>

	)

}

export default ExerciseList