import React from 'react'

import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@app/hooks'

import {
	clearEntries,
	getWorkoutAsync,
	selectWorkouts,
	setActiveWorkout,
}
	from '@features/exercise/exerciseSlice'


function Exercise() {
	const dispatch = useAppDispatch()
	const workouts = useAppSelector(selectWorkouts)

	useEffect(() => {
		dispatch(getWorkoutAsync())
	}, [])

	const workoutOptions = workouts.map((item, idx) => {
		return (
			<option value={item.type} key={idx}>{item.type}</option>
		)
	})

	return (
		< div >
			<h1>Exercise to do</h1>
			<select onChange={(e) => dispatch(setActiveWorkout(e.target.value))}>
				<option hidden disabled selected>-- select an option --</option>
				{workoutOptions}
			</select>

		</div >
	)
}

export default Exercise