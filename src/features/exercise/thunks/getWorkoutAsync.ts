import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Program, Workout, WorkoutEntry } from '@prisma/client'
import { WorkoutInfo } from '../ExerciseSlice'

const getWorkoutAsync = createAsyncThunk(
	'exercise/getWorkout',
	async (_, { rejectWithValue }) => {
		try {

			const { id } = await axios.get('/api/program')
				.then(d => d.data)
				.catch(err => {
					throw Error(err)
				}) as Program

			const workoutTemplates = await axios.get('/api/workout-template', { params: { programId: id } })
				.then(r => r.data)
				.catch(err => {
					throw Error(err)
				}) as Workout[]

			const prevWorkouts = await Promise.all(workoutTemplates.map(workout => axios.get('/api/workout-entry', { params: { workoutType: workout.id, skip: 0 } })))
				.then(list => list.map(item => item.data))
				.catch(err => {
					throw Error(err)
				}) as WorkoutEntry[]

			const data = workoutTemplates.map((item) => {
				const prevWorkout = prevWorkouts.find(workout => workout.workoutTemplateId === item.id)
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

export default getWorkoutAsync