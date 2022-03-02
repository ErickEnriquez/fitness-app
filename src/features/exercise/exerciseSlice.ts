import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { ExerciseTemplate, Workout } from '@prisma/client' 

interface UserEntry extends ExerciseTemplate { 
	weights: number[],
	intensity?: number,
	notes?: string,
	order?: number,
	completed: boolean
}

export interface ExerciseState { 
	entries: UserEntry[]
	workouts: Workout[]
	activeWorkout: number | null
	activeEntry: number
	state: 'idle' | 'loading' | 'failed'
}

const initialState = {
	entries: [] as UserEntry[],
	workouts: [] as Workout[],
	status: 'idle',
	activeWorkout: null,
	activeEntry: null as number
}

//get the list of workouts when we initialize the page , ie pull heavy, legs light etc
export const getWorkoutAsync = createAsyncThunk(
	'exercise/getWorkout',
	async () => { 
		const response = await axios.get('/api/workout-template/')
		return response.data
	}
)

//given a workoutID get the template of exercises for that given workout
export const getExerciseTemplates = createAsyncThunk(
	'exercise/getExerciseTemplates',
	async (id:number) => { 
		const response = await axios.get('/api/exercise-templates', { params: { workoutId: id } })
		return { exercises: response.data, workoutId:id }
	}
)


export const postExerciseEntries = createAsyncThunk(
	'exercise/postExerciseEntries',
	async (arg ,{getState}) => {
		const state = getState() as AppState
		const response = await axios.post('/api/exercise-entry', {entries: state.exercise.entries, templateId: state.exercise.activeWorkout })
		return response.data
	}
)

export const exerciseSlice = createSlice({
	name: 'exercise',
	initialState,
	reducers: {
		clearEntries: (state) => { 
			state.entries = []
		},
		editWeight: (state, action: PayloadAction<{ movementID: number, value: number, setNumber: number }>) => { 
			if (isNaN(action.payload.value)) return
			state.entries.find(entry => entry.id === action.payload.movementID).weights[action.payload.setNumber] = action.payload.value
		},
		editOrder: (state, action: PayloadAction<{ movementID: number, value: number }>) => {
			if (isNaN(action.payload.value)) return
			state.entries.find(entry => entry.id === action.payload.movementID).order = action.payload.value
		},
		editNotes: (state, action: PayloadAction<{ movementID: number, value: string }>) => { 
			state.entries.find(entry => entry.id === action.payload.movementID).notes = action.payload.value
		},	
		editIntensity: (state, action: PayloadAction<{ movementID: number, value: number }>) => { 
			if (isNaN(action.payload.value)) return
			state.entries.find(entry => entry.id === action.payload.movementID).intensity = action.payload.value
		},
		//set the active entry we are working on when given an ID
		setActiveEntry(state, action: PayloadAction<number>) { 
			console.log(action.payload)

			if (isNaN(action.payload)) return
			const activeExercise = state.entries.find(entry => entry.id === action.payload)
			console.log(`Active Exercise: ${activeExercise}`)
			activeExercise ? state.activeEntry = activeExercise.id : state.activeEntry = null
		}
	},
	extraReducers: (builder) => { 
		builder
			//getting list of the workouts
			.addCase(getWorkoutAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getWorkoutAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.workouts = action.payload
			})
			//getting the workout template for a workout
			.addCase(getExerciseTemplates.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getExerciseTemplates.fulfilled, (state, action) => {
				state.status = 'idle'
				state.entries = action.payload.exercises.map((entry: ExerciseTemplate) => {
					return {
						...entry,
						weights: Array(entry.sets).fill(''),
						intensity: '',
						notes: '',
						order: '',
						completed: false
					}
				})
				//mark the type of workout that we are doing
				state.activeWorkout = action.payload.workoutId
			})
			//posting the exercise entries
			.addCase(postExerciseEntries.pending, (state) => { state.status = 'loading' })
			.addCase(postExerciseEntries.fulfilled, (state) => {
				state.status = 'idle'
				state.entries = []
			})
		
	}
})

export const { clearEntries, editWeight, editOrder, editNotes, editIntensity, setActiveEntry } = exerciseSlice.actions

export const selectWorkouts = (state: AppState) => state.exercise.workouts
export const selectEntries = (state: AppState) => state.exercise.entries
export const selectStatus = (state: AppState) => state.exercise.status
export const selectActiveEntry = (state: AppState) => state.exercise.activeEntry

export default exerciseSlice.reducer