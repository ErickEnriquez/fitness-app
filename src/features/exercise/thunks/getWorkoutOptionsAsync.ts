import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Program, WorkoutTemplate } from '@prisma/client'
import { WorkoutInfo } from '../ExerciseSlice'

import { WorkoutEntry } from '@prisma/client'

const getWorkoutOptionsAsync = createAsyncThunk(
	'exercise/getWorkout',
	async (_, { rejectWithValue }) => {
		try {

			const { id } = await axios.get('/api/program')
				.then(d => d.data)
				.catch(err => {
					throw Error(err)
				}) as Program

			const workoutTemplates = await axios.get('/api/workout-template', { params: { programId: id } })
				.then(r => {
					return r.data
				})
				.catch(err => {
					throw Error(err)
				}) as WorkoutTemplate[]

			const prevWorkouts = await Promise.all(workoutTemplates.map(workout => axios.get('/api/workout-entry', { params: { workoutType: workout.id, skip: 0 } })))
				.then(list => list.map(item => item.data))
				.catch(err => {
					console.error(err)
				}) as WorkoutEntry[]

			const data = workoutTemplates.map((item) => {
				const prevWorkout = prevWorkouts && prevWorkouts.find(workout => workout.workoutTemplateId === item.id)
				return {
					...prevWorkout,
					...item,
					//label the workoutEntry id key as prevWorkoutId to avoid conflict with the workoutTemplate id key
					prevWorkoutId: prevWorkout ? prevWorkout.id : null,
				}
			}) as WorkoutInfo[]

			return data
		}
		catch (err) {
			console.error(err)
			return rejectWithValue('Unable to get workout async')
		}
	}
)

export default getWorkoutOptionsAsync