import React from 'react'

import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import Loading from '@features/loading/Loading'
import {
	//actions
	clearEntries,
	setWeight,
	setOrder,
	//async actions
	getWorkoutAsync,
	getExerciseAsync,
	//state grabbers
	selectWorkouts,
	selectEntries,
}
	from '@features/exercise/exerciseSlice'


function Exercise() {
	const dispatch = useAppDispatch()
	const workouts = useAppSelector(selectWorkouts)
	const exercises = useAppSelector(selectEntries)
	const status = useAppSelector(state => state.exercise.status)
	useEffect(() => {
		dispatch(getWorkoutAsync())
	}, [])

	const workoutOptions = workouts.map((item, idx) => {
		return (
			<option value={item.id} key={idx}>{item.type}</option>
		)
	})

	const exerciseToDos = exercises.map((item, idx) => {
		return (
			<li
				className='w-11/12 mx-auto'
				key={idx}
			>
				<strong>{item.name}</strong>
				<h5 className='mb-4'>Sets {item.sets}x{item.reps}</h5>
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
			</li>
		)
	})
	if (status === 'loading') return <Loading />
	return (
		< div >
			<h1>Exercise to do</h1>
			<select onChange={(e) => dispatch(getExerciseAsync(Number(e.target.value)))}>
				<option hidden disabled selected>-- select an option --</option>
				{workoutOptions}
			</select>
			<ul>{exerciseToDos}</ul>
		</div >
	)
}

export default Exercise