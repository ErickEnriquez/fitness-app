import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import deleteCardio from './deleteCardio'
import createNewCardio from './createNewCardio'
import getCardio from './getCardio'
import updateCardio from './updateCardio'

import type { AppState } from '@app/store'

export interface CardioState {
	status: 'idle' | 'loading' | 'failed' | 'success'
	cardioType: string
	caloriesBurned: number
	distance: number
	time: number
	notes: string
	intensity: number
	//use this when we are working on a previous cardio section
	completedCardioId: number
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

export const CardioSlice = createSlice({
	name: 'cardio',
	initialState,
	reducers: {
		clearStatus: (state) => { state.status = 'idle' },
		editNumberInput: (state, action: PayloadAction<EventTarget & HTMLInputElement>) => {
			if (Number.isNaN(action.payload.value)) return
			const name = action.payload.name
			state[name] = Number(action.payload.value)
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
			.addCase(createNewCardio.pending, state => { state.status = 'loading' })
			.addCase(createNewCardio.fulfilled, state => { state.status = 'success' })
			.addCase(createNewCardio.rejected, state => { state.status = 'failed' })
			.addCase(getCardio.pending, state => { state.status = 'loading' })
			.addCase(getCardio.rejected, state => { state.status = 'failed' })
			.addCase(getCardio.fulfilled, (state, action) => {
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
			.addCase(updateCardio.pending, state => { state.status = 'loading' })
			.addCase(updateCardio.rejected, state => { state.status = 'failed' })
			.addCase(updateCardio.fulfilled, (state, action) => {
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
			.addCase(deleteCardio.pending, state => { state.status = 'loading' })
			.addCase(deleteCardio.rejected, state => { state.status = 'failed' })
			.addCase(deleteCardio.fulfilled, state => { state.status = 'success' })
	},
})

export const {
	editNumberInput,
	clearStatus,
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