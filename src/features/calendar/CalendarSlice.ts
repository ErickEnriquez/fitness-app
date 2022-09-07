import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { Program, Workout } from '@prisma/client'
import { PreviousCardio } from '@server/getPreviousCardio'
import { PreviousWorkoutsEntry } from '@server/getPreviousWorkouts'

/**
 * @property {string} status status of the slice returns if we are loading, success, or failed
 * @property {WorkoutEntry[]} workouts the list of workouts that have been made
 * @property {Date} activeDate the active date that we are currently on
 * @property {Date} selectedDate the date we have selected
 */
export interface CalendarState {
	status: 'idle' | 'loading' | 'failed' | 'success'
	workouts: PreviousWorkoutsEntry[]
	cardios: PreviousCardio[]
	activeDate: string
	selectedDate: string
}

const initialState: CalendarState = {
	status: 'idle',
	workouts: [] as PreviousWorkoutsEntry[],
	cardios: [] as PreviousCardio[],
	activeDate: new Date().toISOString(),
	selectedDate: new Date().toISOString(),
}

/**
 * get the list of the workouts from the DB that were created within the start and end dates
 */
export const getWorkoutsAsync = createAsyncThunk(
	'calendar/getWorkouts',
	//pass the start and the end dates to the reducer function
	async ({ start, end }: { start: string, end: string }, { rejectWithValue }) => {
		try {
			const previousCardios = axios.get('/api/calendar/cardio', { params: { start, end } })
			const program = axios.get('/api/program')

			const [p, cardio] = await Promise.all([
				program,
				previousCardios
			]).then(list => [list[0].data, list[1].data])

			const workoutTemplates = await axios.get('/api/workout-template', { params: { programId: p.id as Program } })
				.then(r => r.data) as Workout[]

			const previousWorkouts = await Promise.all(
				workoutTemplates.map(item =>
					(axios.get('/api/calendar/workout-entry', { params: { start, end, templateId: item.id } }))))
				.then(r => r.map(i => i.data).flat()) as PreviousWorkoutsEntry[]

			previousWorkouts.sort((a, b) => +new Date(a.date) - +new Date(b.date))
			return { previousWorkouts, cardio: cardio as PreviousCardio[] }
		} catch (err) {
			console.error(err)
			return rejectWithValue('Unable to get previous workouts')
		}
	}
)

export const CalendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		clearStatus: (state) => {
			state.status = 'idle'
		},
		editSelectedDate: (state, action: PayloadAction<string>) => {
			state.selectedDate = action.payload
		},
		editActiveDate: (state, action: PayloadAction<string>) => {
			state.activeDate = action.payload
		},
		resetState: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getWorkoutsAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getWorkoutsAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.workouts = action.payload.previousWorkouts
				state.cardios = action.payload.cardio
			})
			.addCase(getWorkoutsAsync.rejected, (state) => {
				state.status = 'failed'
			})
	}
})


export const {
	clearStatus,
	editActiveDate,
	editSelectedDate,
	resetState
} = CalendarSlice.actions

export const selectStatus = (state: AppState) => state.calendar.status
export const selectWorkouts = (state: AppState) => state.calendar.workouts
export const selectActiveDate = (state: AppState) => state.calendar.activeDate
export const selectSelectedDate = (state: AppState) => state.calendar.selectedDate
export const selectCardioList = (state: AppState) => state.calendar.cardios

export default CalendarSlice.reducer