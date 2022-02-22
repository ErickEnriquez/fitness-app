import React from 'react'

import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@app/hooks'

import {
	clear, getWorkoutAsync, selectWorkout
} from './exerciseSlice'


function Exercise() {
	const dispatch = useAppDispatch()
	const workout = useAppSelector(selectWorkout)

	useEffect(() => {
		dispatch(getWorkoutAsync())
	}, [])

	const workoutTemplate = workout.map((item, idx) => {
		return (
			<div key={idx}>
				<h3>{item.type}</h3>
			</div>
		)
	})

	return (
		< div >
			{workoutTemplate}
			Test
		</div >
	)
}

export default Exercise