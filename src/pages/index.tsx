import React, { useEffect } from 'react'
import { NextPage } from 'next'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import Loading from '@features/loading/Loading'
import {
	//actions
	clearEntries,
	setWeight,
	setOrder,
	editNotes,
	editIntensity,
	//async actions
	getWorkoutAsync,
	getExerciseAsync,
	//state grabbers
	selectWorkouts,
	selectEntries,
	postExerciseEntries
}
	from '@features/exercise/exerciseSlice'


const IndexPage: NextPage = () => {
	const dispatch = useAppDispatch()
	const workouts = useAppSelector(selectWorkouts)
	const exercises = useAppSelector(selectEntries)
	const status = useAppSelector(state => state.exercise.status)

	//grab the workout templates from the server on page load
	useEffect(() => {
		dispatch(getWorkoutAsync())
	}, [])

	//map the options that we have for a workout ie push heavy , legs light etc
	const workoutOptions = workouts.map((item, idx) => {
		return (
			<option data-workout-type={item.type} value={item.id} key={idx}>{item.type}</option>
		)
	})

	//create array of exercises to be filled out
	//TODO: make this its own component
	const exerciseToDos = exercises.map((item, idx) => {
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
	if (status === 'loading') return <Loading />
	return (
		<div className='text-center'>
			<h1>Exercise to do</h1>
			<select onChange={(e) => dispatch(getExerciseAsync({workoutID:Number(e.target.value), type:e.target.dataset.workoutType}))}>
				<option hidden disabled selected>-- select an option --</option>
				{workoutOptions}
			</select>
			<ul>{exerciseToDos}</ul>
			<div className='my-4'>
				<button
					className='px-5 rounded-full bg-green-700 mx-1 text-white  hover:bg-white hover:text-green-700 hover:outline'
					onClick={() => dispatch(postExerciseEntries())}
				>
					Submit
				</button>
				<button
					className='px-5 rounded-full bg-red-700 mx-1 text-white  hover:bg-white hover:text-red-700 hover:outline'
					onClick={() => {
						const a = confirm('Are you sure you want to clear the workout?')
						if (a) dispatch(clearEntries())
					}}
				>
					Clear
				</button>
			</div>

		</div >
	)
}

export default IndexPage