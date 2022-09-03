import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { WorkoutEntry, ExerciseEntry, ExerciseTemplate, Movement } from '@prisma/client'

//expand the ExerciseEntry field to include the name of the exercise as well as the number of sets
export interface PreviousExercise extends ExerciseEntry {
	name: string,
	reps: number
}


export interface PreviousWorkoutState {
	status: 'idle' | 'loading' | 'failed' | 'success'
	workout: WorkoutEntry
	exercises: PreviousExercise[]
}


const initialState = {
	status: 'idle',
	workout: null as WorkoutEntry,
	exercises: [] as PreviousExercise[]
}

/**
 * given a workoutId, return the workout that corresponds to it as well as the exercises that were performed as part of the workout
 */
export const getWorkoutDataAsync = createAsyncThunk(
	'previousWorkout/getWorkoutData',
	async (workoutId: number, { rejectWithValue }) => {
		try {
			const response = await Promise.all([
				//get the previousWorkout
				axios.get('/api/workout-entry', { params: { Id: workoutId } }),
				// get the exercise for the workout
				axios.get('/api/exercise-entry', { params: { workoutId } })
			])

			const exercises = response[1].data as ExerciseEntry[]
			const prevWorkout = response[0].data as WorkoutEntry

			const templates = await Promise.all(exercises
				.map(exercise => axios.get('/api/exerciseEntry', { params: { exerciseId: exercise.exerciseID } }))
			).then(r => r.map(t => t.data)) as ExerciseTemplate[]

			const movements = await Promise.all(templates.map(template => {
				return axios.get('/api/movement', { params: { movementId: template.movementID } })
			})).then(r => r.map(m => m.data)) as Movement[]

			const data = exercises.map((e, idx) => ({ ...e, reps: templates[idx].reps, name: movements[idx].name })) as PreviousExercise[]

			return { exercises: data, workout: prevWorkout }
		} catch (err) {
			console.error(err)
			return rejectWithValue(err)
		}
	}
)



export const PreviousWorkoutSlice = createSlice({
	name: 'previousWorkout',
	initialState,
	reducers: {
		clearStatus: (state) => { state.status = 'idle' },
		resetState: () => initialState
	},
	extraReducers(builder) {
		builder
			.addCase(getWorkoutDataAsync.pending, state => { state.status = 'loading' })
			.addCase(getWorkoutDataAsync.rejected, state => { state.status = 'failed' })
			.addCase(getWorkoutDataAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.exercises = action.payload.exercises.sort((a, b) => a.order - b.order)
				state.workout = action.payload.workout
			})
	},
})

export const {
	clearStatus,
	resetState
} = PreviousWorkoutSlice.actions

export const selectStatus = (state: AppState) => state.previousWorkout.status
export const selectWorkout = (state: AppState) => state.previousWorkout.workout
export const selectExercises = (state: AppState) => state.previousWorkout.exercises


export default PreviousWorkoutSlice.reducer