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
	name: string
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
	activeWorkout: null as number,
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

// export const getLastWorkoutDates = createAsyncThunk(
// 	'exercise/getLastWorkoutDates',
// 	async (id:number) => { 
// 		const response = await axios.get('/api/workout-entry/', { params: { workoutId: id } })
// 		return response.data
// 	}
// )


export const postExerciseEntries = createAsyncThunk(
	'exercise/postExerciseEntries',
	async (arg ,{getState, rejectWithValue}) => {
		const { exercise: { entries, activeWorkout } } = getState() as AppState
		
		if (entries.some(e => e.completed !== true)) {
			console.log('not all entries are completed')
			rejectWithValue({mes:'You must complete all entries before submitting', entries})
		}
		else {

			const response = await axios.post('/api/exercise-entry', { entries, templateId: activeWorkout })
			return response.data
		}
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
			state.entries.find(entry => entry.movementID === action.payload.movementID).weights[action.payload.setNumber] = action.payload.value
		},
		editOrder: (state, action: PayloadAction<{ movementID: number, value: number }>) => {
			if (isNaN(action.payload.value)) return
			state.entries.find(entry => entry.movementID === action.payload.movementID).order = action.payload.value
		},
		editNotes: (state, action: PayloadAction<{ movementID: number, value: string }>) => { 
			state.entries.find(entry => entry.movementID === action.payload.movementID).notes = action.payload.value
		},	
		editIntensity: (state, action: PayloadAction<{ movementID: number, value: number }>) => { 
			if (isNaN(action.payload.value)) return
			state.entries.find(entry => entry.movementID === action.payload.movementID).intensity = action.payload.value
		},
		//set the active entry we are working on when given an ID
		setActiveEntry(state, action: PayloadAction<number>) { 
			if (isNaN(action.payload)) return
			state.activeEntry = state.entries.find(entry => entry.id === action.payload).id
		},
		toggleExerciseComplete(state, action: PayloadAction<number>) { 
			if (isNaN(action.payload)) return
			state.entries.find(entry => entry.id === action.payload).completed = !state.entries.find(entry => entry.id === action.payload).completed
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
				//mark the type of workout that we are doing
				state.activeWorkout = action.payload.workoutId
				//create the entries for the workout
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
			})
			//posting the exercise entries
			.addCase(postExerciseEntries.pending, (state) => { state.status = 'loading' })
			.addCase(postExerciseEntries.fulfilled, (state) => {
				state.status = 'idle'
				state.entries = []
			})
			.addCase(postExerciseEntries.rejected, (state, action) => { 
				state.status = 'idle'
				console.log(console.log(action.payload))
			})
	}
})

export const { clearEntries, editWeight, editOrder, editNotes, editIntensity, setActiveEntry, toggleExerciseComplete } = exerciseSlice.actions

export const selectWorkouts = (state: AppState) => state.exercise.workouts
export const selectEntries = (state: AppState) => state.exercise.entries
export const selectStatus = (state: AppState) => state.exercise.status
export const selectActiveEntry = (state: AppState) => state.exercise.activeEntry

export default exerciseSlice.reducer