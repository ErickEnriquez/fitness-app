import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'

export interface CardioState {
	status: 'idle' | 'loading' | 'failed' | 'success'
	cardioType: string
	caloriesBurned: number
	distance: number
	time: number
	notes: string
	intensity: number
}

const initialState: CardioState = {
	status: 'idle',
	cardioType: '',
	caloriesBurned: 0,
	distance: 0,
	time: 0,
	notes: '',
	intensity: 0
}

export const submitCardioInfo = createAsyncThunk(
	'cardio/submitCardio',
	async (_, { getState, rejectWithValue }) => {
		const { cardio } = getState() as AppState
		const result = await axios.post('/api/cardio', { ...cardio })
		if (result.status !== 200) {
			rejectWithValue(result.data)
		}
		return
	}
)

export const CardioSlice = createSlice({
	name: 'cardio',
	initialState,
	reducers: {
		clearStatus: (state) => { state.status = 'idle' },
		editCardioIntensity: (state, action: PayloadAction<number>) => {
			//limit values from 1-10 only
			if (isNaN(action.payload) || action.payload < 1 || action.payload > 10) {
				return
			}
			state.intensity = action.payload
		},
		editCaloriesBurned: (state, action: PayloadAction<number>) => {
			if (isNaN(action.payload) || action.payload < 1) {
				return
			}
			state.caloriesBurned = action.payload
		},
		editDistance: (state, action: PayloadAction<number>) => {
			if (isNaN(action.payload) || action.payload < 0) {
				return
			}
			state.distance = action.payload
		},
		editTime: (state, action: PayloadAction<number>) => {
			if (isNaN(action.payload) || action.payload < 0) {
				return
			}
			state.time = action.payload
		},
		editCardioType: (state, action: PayloadAction<string>) => {
			state.cardioType = action.payload
		},
		editCardioNotes: (state, action: PayloadAction<string>) => {
			state.notes = action.payload
		},
		clearCardioState: (state) => {
			state.caloriesBurned = 0
			state.cardioType = ''
			state.distance = 0
			state.intensity = 0
			state.notes = ''
			state.time = 0
			state.status = 'idle'
		}
	},
	extraReducers(builder) {
		builder
			.addCase(submitCardioInfo.pending, state => { state.status = 'loading' })
			.addCase(submitCardioInfo.fulfilled, state => { state.status = 'success' })
			.addCase(submitCardioInfo.rejected, state => { state.status = 'failed' })
	},
})

export const {
	clearStatus,
	editCardioIntensity,
	editCaloriesBurned,
	editCardioType,
	editDistance,
	editTime,
	editCardioNotes,
	clearCardioState
} = CardioSlice.actions

export const selectCardioState = (state: AppState) => state.cardio
export const selectStatus = (state: AppState) => state.cardio.status
export const selectCardioIntensity = (state: AppState) => state.cardio.intensity
export const selectCaloriesBurned = (state: AppState) => state.cardio.caloriesBurned
export const selectCardioStatus = (state: AppState) => state.cardio.status
export const selectDistance = (state: AppState) => state.cardio.distance
export const selectCardioTime = (state: AppState) => state.cardio.time
export const selectCardioNotes = (state: AppState) => state.cardio.notes
export const selectCardioType = (state: AppState) => state.cardio.cardioType

export default CardioSlice.reducer