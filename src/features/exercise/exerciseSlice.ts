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
	state: 'idle' | 'loading' | 'failed'
}

const initialState = {
	entries: [] as UserEntry[],
	workouts: [] as Workout[],
	status: 'idle'
}

//get the list of workouts when we initialize the page , ie pull heavy, legs light etc
export const getWorkoutAsync = createAsyncThunk(
	'exercise/getWorkout',
	async () => { 
		const response = await axios.get('/api/getWorkoutTemplate/')
		return response.data
	}
)

//given a workoutID get the template of exercises for that given workout
export const getExerciseAsync = createAsyncThunk(
	'exercise/getExercise',
	async (id:number) => { 
		const response = await axios.get('/api/getExercises', { params: { workoutId: id } })
		console.log(response.data)
		return response.data
	}
)

export const exerciseSlice = createSlice({
	name: 'exercise',
	initialState,
	reducers: {
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
			.addCase(getExerciseAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getExerciseAsync.fulfilled, (state, action) => { 
				state.status = 'idle'
				state.entries = action.payload
			})
		
	}
})

export const { clearEntries } = exerciseSlice.actions

export const selectWorkouts = (state: AppState) => state.exercise.workouts
export const selectEntries = (state: AppState) => state.exercise.entries
export const selectStatus = (state: AppState) => state.exercise.status

export default exerciseSlice.reducer