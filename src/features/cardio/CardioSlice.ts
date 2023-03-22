import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { Cardio } from '@prisma/client'
import { SerializedCardio } from '@server/cardio/cardio'
import { CardioFormInputs } from 'src/pages/cardio'

export interface CardioState {
	status: 'idle' | 'loading' | 'failed' | 'success'
	cardioType: string
	caloriesBurned: number
	distance: number
	time: number
	notes: string
	intensity: number
	//use this when we are working on a previous cardio section
	completedCardioId: string
	timeCreated: string
	editPreviousCardio: boolean
	isPreviousWorkoutChanged: boolean

}

const initialState: CardioState = {
	status: 'idle',
	cardioType: '',
	caloriesBurned: 0,
	distance: 0,
	time: 0,
	notes: '',
	intensity: 0,
	completedCardioId: null,
	timeCreated: '',
	editPreviousCardio: false,
	isPreviousWorkoutChanged: false
}

export const submitCardioInfo = createAsyncThunk(
	'cardio/submitCardio',
	async (data: CardioFormInputs, { rejectWithValue }) => {
		try {
			const { intensity, time, caloriesBurned, distance, notes, type } = data
			await axios.post('/api/cardio', { intensity:Number(intensity), time:Number(time), caloriesBurned:Number(caloriesBurned), distance:Number(distance), notes, cardioType:type })
		} catch (err) { return rejectWithValue(err) }
	}
)

export const getPreviousCardioInfo = createAsyncThunk(
	'cardio/getPreviousCardioInfo',
	async (cardioId: number, { rejectWithValue }) => {
		try {
			const { data } = await axios.get<SerializedCardio>('/api/cardio', { params: { cardioId } })

			if (!data) return rejectWithValue('Unable to get data')

			return data
		} catch (err) { return rejectWithValue(err) }
	}
)

/**
 * send the updated state to the DB and update the cardio info with whatever was changed
 */
export const updateCardioInfo = createAsyncThunk(
	'cardio/updatePreviousCardioInfo',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { cardio } = getState() as AppState
			const { intensity, time, caloriesBurned, distance, notes, completedCardioId } = cardio

			const { data } = await axios.put<SerializedCardio>('/api/cardio', { intensity, time, caloriesBurned, distance, notes, completedCardioId })
			if (!data) return rejectWithValue('Error updating cardio info')

			return data
		}
		catch (err) {
			console.error(err)
			return rejectWithValue('Error has occurred, please try again later')
		}
	}
)
/**
 * send request to server to delete the cardio entry with the given Id
 */
export const deleteCardioEntry = createAsyncThunk(
	'cardio/deleteCardioEntry',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { cardio } = getState() as AppState
			const req = await axios.delete('/api/cardio', { params: { cardioId: cardio.completedCardioId } })
			if (!req) return rejectWithValue('Error deleting entry')

		} catch (err) {
			console.error(err)
			return rejectWithValue('Error has occurred, please try again later')
		}
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
			state.isPreviousWorkoutChanged = true
		},
		editCaloriesBurned: (state, action: PayloadAction<number>) => {
			if (isNaN(action.payload) || action.payload < 1) {
				return
			}
			state.caloriesBurned = action.payload
			state.isPreviousWorkoutChanged = true

		},
		editDistance: (state, action: PayloadAction<number>) => {
			if (isNaN(action.payload) || action.payload < 0) {
				return
			}
			state.distance = action.payload
			state.isPreviousWorkoutChanged = true

		},
		editTime: (state, action: PayloadAction<number>) => {
			if (isNaN(action.payload) || action.payload < 0) {
				return
			}
			state.time = action.payload
			state.isPreviousWorkoutChanged = true

		},
		editCardioType: (state, action: PayloadAction<string>) => {
			state.cardioType = action.payload
		},
		editCardioNotes: (state, action: PayloadAction<string>) => {
			state.notes = action.payload
			state.isPreviousWorkoutChanged = true

		},
		toggleEditPreviousCardio: (state) => {
			state.editPreviousCardio = !state.editPreviousCardio
		},
		resetState: () => initialState
	},
	extraReducers(builder) {
		builder
			.addCase(submitCardioInfo.pending, state => { state.status = 'loading' })
			.addCase(submitCardioInfo.fulfilled, state => { state.status = 'success' })
			.addCase(submitCardioInfo.rejected, state => { state.status = 'failed' })
			.addCase(getPreviousCardioInfo.pending, state => { state.status = 'loading' })
			.addCase(getPreviousCardioInfo.rejected, state => { state.status = 'failed' })
			.addCase(getPreviousCardioInfo.fulfilled, (state, action) => {
				state.status = 'idle'
				state.cardioType = action.payload.type
				state.caloriesBurned = action.payload.caloriesBurned
				state.distance = Number(action.payload.distance)
				state.intensity = action.payload.intensity
				state.notes = action.payload.notes
				state.time = action.payload.time
				state.completedCardioId = action.payload.id
				state.timeCreated = action.payload.timeCreated
			})
			.addCase(updateCardioInfo.pending, state => { state.status = 'loading' })
			.addCase(updateCardioInfo.rejected, state => { state.status = 'failed' })
			.addCase(updateCardioInfo.fulfilled, (state, action) => {
				state.status = 'success'
				state.cardioType = action.payload.type
				state.caloriesBurned = action.payload.caloriesBurned
				state.distance = Number(action.payload.distance)
				state.intensity = action.payload.intensity
				state.notes = action.payload.notes
				state.time = action.payload.time
				state.completedCardioId = action.payload.id
				state.timeCreated = action.payload.timeCreated
			})
			.addCase(deleteCardioEntry.pending, state => { state.status = 'loading' })
			.addCase(deleteCardioEntry.rejected, state => { state.status = 'failed' })
			.addCase(deleteCardioEntry.fulfilled, state => { state.status = 'success' })
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
	toggleEditPreviousCardio,
	resetState
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