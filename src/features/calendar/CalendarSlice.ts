import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { Program, WorkoutEntry } from '@prisma/client'
import { SerializedCardio } from '@server/cardio'
import { PreviousWorkoutsEntry } from '@server/getPreviousWorkouts'

/**
 * @property {string} status status of the slice returns if we are loading, success, or failed
 * @property {WorkoutEntry[]} workouts the list of workouts that have been made
 * @property {Date} activeDate the active date that we are currently on
 */
export interface CalendarState {
	status: 'idle' | 'loading' | 'failed' | 'success'
	workouts: PreviousWorkoutsEntry[]
	cardioList: SerializedCardio[]
	activeDate: string,
	workoutId: string
	cardioId: string,
	isModalVisible: boolean
}

const initialState: CalendarState = {
	status: 'idle',
	workouts: [] as PreviousWorkoutsEntry[],
	cardioList: [] as SerializedCardio[],
	activeDate: new Date().toISOString(),
	workoutId: null,
	cardioId: null,
	isModalVisible: false
}

/**
 * get the list of the workouts from the DB that were created within the start and end dates
 */
export const getWorkoutsAsync = createAsyncThunk(
	'calendar/getWorkouts',
	//pass the start and the end dates to the reducer function
	async ({ start, end }: { start: string, end: string }, { rejectWithValue }) => {
		try {
			const previousCardioList = axios.get('/api/calendar/cardio', { params: { start, end } })
			const program = axios.get('/api/program')

			const [p, cardio] = await Promise.all([
				program,
				previousCardioList
			]).then(list => [list[0].data, list[1].data])

			const workoutTemplates = await axios.get('/api/workout-template', { params: { programId: p.id as Program } })
				.then(r => r.data) as WorkoutEntry[]

			const previousWorkouts = await Promise.all(
				workoutTemplates.map(item =>
					(axios.get('/api/calendar/workout-entry', { params: { start, end, templateId: item.id } }))))
				.then(r => r.map(i => i.data).flat()) as PreviousWorkoutsEntry[]

			previousWorkouts.sort((a, b) => +new Date(a.date) - +new Date(b.date))
			return { previousWorkouts, cardio: cardio as SerializedCardio[] }
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
		editActiveDate: (state, action: PayloadAction<string>) => {
			state.activeDate = action.payload
		},
		editWorkoutId: (state, action: PayloadAction<string>) => { 
			state.workoutId = action.payload
		},
		editCardioId: (state, action: PayloadAction<string>) => { 
			state.cardioId = action.payload
		},
		toggleModal: (state) => {		
			state.isModalVisible = !state.isModalVisible
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
				state.cardioList = action.payload.cardio
			})
			.addCase(getWorkoutsAsync.rejected, (state) => {
				state.status = 'failed'
			})
	}
})


export const {
	clearStatus,
	editActiveDate,
	resetState,
	editWorkoutId,
	editCardioId,
	toggleModal
} = CalendarSlice.actions

export const selectStatus = (state: AppState) => state.calendar.status
export const selectWorkouts = (state: AppState) => state.calendar.workouts
export const selectActiveDate = (state: AppState) => state.calendar.activeDate
export const selectCardioList = (state: AppState) => state.calendar.cardioList
export const selectWorkoutId = (state: AppState) => state.calendar.workoutId
export const selectCardioId = (state: AppState) => state.calendar.cardioId
export const selectIsModalVisible = (state: AppState) => state.calendar.isModalVisible

export default CalendarSlice.reducer