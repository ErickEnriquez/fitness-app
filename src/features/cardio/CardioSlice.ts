import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { WorkoutEntry } from '@prisma/client'

export interface CardioState {
	status: 'idle' | 'loading' | 'failed' | 'success'
	cardioType: string
	caloriesBurned: number
	distance: number
	time: number
	notes: string
}

const initialState: CardioState = {
	status: 'idle',
	cardioType: '',
	caloriesBurned: 0,
	distance: 0,
	time: 0,
	notes: ''
}

export const CardioSlice = createSlice({
	name: 'cardio',
	initialState,
	reducers: {
		clearStatus: (state) => { state.status = 'idle' }
	}
})


export default CardioSlice.reducer