import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { ExerciseEntry, ExerciseTemplate, Workout, WorkoutEntry } from '@prisma/client'

/**
 * @property {string} status status of the slice returns if we are loading, success, or failed
 * @property {WorkoutEntry[]} entries the list of workouts that have been made
 * @property {Date} activeDate the active date that we are currently on
 * @property {Date} selectedDate the date we have selected
 */
export interface CalendarState {
	status: 'idle' | 'loading' | 'failed' | 'success'
	workouts: WorkoutEntry[]
	activeDate: Date
	selectedDate: Date
}

const initialState: CalendarState = {
	status: 'idle',
	workouts: [] as WorkoutEntry[],
	activeDate: new Date(),
	selectedDate: new Date()
}

export const getWorkoutsAsync = createAsyncThunk(
	'calendar/getWorkouts',
	//pass the start and the end dates to the reducer function
	async ({ start, end }: { start: string, end: string }) => {
		const response = await axios.post('/api/workouts/', { start, end })
		console.log(response.data)
		return response.data as WorkoutEntry[]
	}
)

export const CalendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		clearStatus: (state) => {
			state.status = 'idle'
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getWorkoutsAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getWorkoutsAsync.rejected, (state) => {
				state.status = 'failed'
			})
			.addCase(getWorkoutsAsync.fulfilled, (state, action) => {
				state.status = 'success'
				state.workouts = action.payload
			})
	}
})


export const {
	clearStatus
} = CalendarSlice.actions

export const selectStatus = (state: AppState) => state.calendar.status
export const selectWorkouts = (state: AppState) => state.calendar.workouts
export const selectActiveDate = (state: AppState) => state.calendar.activeDate
export const selectSelectedDate = (state: AppState) => state.calendar.selectedDate

export default CalendarSlice.reducer