import React, { useEffect } from 'react'
import { NextPage } from 'next'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import Loading from '@features/loading/Loading'
import ExerciseList from '@features/exercise/ExerciseList'
import {
	//actions
	clearEntries,
	//async actions
	getWorkoutAsync,
	getExerciseAsync,
	//state grabbers
	selectWorkouts,
	postExerciseEntries
}
	from '@features/exercise/exerciseSlice'


const IndexPage: NextPage = () => {
	const dispatch = useAppDispatch()
	const workouts = useAppSelector(selectWorkouts)
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


	if (status === 'loading') return <Loading />
	return (
		<div className='text-center'>
			<h1>Exercise to do</h1>
			<select onChange={(e) => dispatch(getExerciseAsync(Number(e.target.value)))}>
				<option hidden disabled selected>-- select an option --</option>
				{workoutOptions}
			</select>
			<ul>
				<ExerciseList />
			</ul>
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