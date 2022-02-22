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
	workouts: Workout[]
	activeWorkout: Workout  | null
	state: 'idle' | 'loading' | 'failed'
}

const initialState = {
	entries: [] as UserEntry[],
	workouts: [] as Workout[],
	activeWorkout: null,
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
		setActiveWorkout: (state, action: PayloadAction<string>) => { 
			state.activeWorkout = state.workouts.find(w => w.type === action.payload)
		},
		clearEntries: (state) => { 
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
				state.workouts = action.payload
			})
		
	}
})

export const { clearEntries, setActiveWorkout } = exerciseSlice.actions

export const selectWorkouts = (state: AppState) => state.exercise.workouts
export const selectEntries = (state: AppState) => state.exercise.entries
export const selectStatus = (state: AppState) => state.exercise.status

export default exerciseSlice.reducer