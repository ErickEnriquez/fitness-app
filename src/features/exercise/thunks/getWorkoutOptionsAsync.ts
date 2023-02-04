import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Program, WorkoutTemplate } from '@prisma/client'
import { WorkoutInfo } from '../ExerciseSlice'

import { WorkoutEntry } from '@prisma/client'

const getWorkoutOptionsAsync = createAsyncThunk(
	'exercise/getWorkout',
	async (_, { rejectWithValue }) => {
		try {

			const { id } = await axios.get<Program>('/api/program')
				.then(d => d.data)
				.catch(err => {
					throw Error(err)
				})

			const workoutTemplates = await axios.get<WorkoutTemplate[]>('/api/workout-template', { params: { programId: id } })
				.then(r => {
					return r.data
				})
				.catch(err => {
					throw Error(err)
				})

			const prevWorkouts = await Promise.allSettled(
				workoutTemplates
					.map(workout => axios.get<WorkoutEntry>('/api/workout-entry', { params: { workoutType: workout.id, skip: 0 } }))
			)
				.then(list => list
					.map(item => item.status === 'fulfilled' ? item.value.data : null)
					.filter(item => item !== null))
				.catch(err => {
					console.error(err)
				})
	
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