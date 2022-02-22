import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState, AppThunk } from '@app/store'
import { ExerciseTemplate, Workout } from '@prisma/client' 

interface WorkoutTemplate extends ExerciseTemplate {
	name: string
}

interface UserEntry extends WorkoutTemplate { 
	weights: number[] | string[],
	intensity?: number,
	notes?: string,
	order?: number
}

export interface ExerciseState { 
	entries: UserEntry[]
	workout: Workout[]
	state: 'idle' | 'loading' | 'failed'
}

const initialState = {
	entries: [] as UserEntry[],
	workout: [] as Workout[],
	status: 'idle'
}

export const getWorkoutAsync = createAsyncThunk(
	'exercise/getWorkout',
	async () => { 
		const response = await axios.get('/api/getWorkoutTemplate/')
		return response.data
	}
)

export const exerciseSlice = createSlice({
	name: 'exercise',
	initialState,
	reducers: {
		clear: (state) => { 
			state.entries = []
		}
	},
	extraReducers: (builder) => { 
		builder
			.addCase(getWorkoutAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getWorkoutAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.workout = action.payload
			})
		
	}
})

export const { clear } = exerciseSlice.actions

export const selectWorkout = (state: AppState) => state.exercise.workout

export default exerciseSlice.reducer