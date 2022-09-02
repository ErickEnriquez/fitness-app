import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { WorkoutEntry, ExerciseEntry } from '@prisma/client'

export interface PreviousWorkoutState {
	status: 'idle' | 'loading' | 'failed' | 'success'
	workout: WorkoutEntry
	exercises: ExerciseEntry[]
}


const initialState = {
	status: 'idle',
	workout: null as WorkoutEntry,
	exercises: [] as ExerciseEntry[]
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

			return { exercises, workout: prevWorkout }
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
				state.exercises = action.payload.exercises
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