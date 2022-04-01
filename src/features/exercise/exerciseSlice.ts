import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { ExerciseEntry, ExerciseTemplate, Workout, WorkoutEntry } from '@prisma/client' 

//this holds the miscellaneous data about the workout that isn't tied to a specific exercise instead the entire workout in general
export interface activeWorkoutInfo{
	notes?: string,
	workoutTemplateId: number,
	preWorkout: boolean,
	grade: number,
}


//combination of workout templates and workout entries, 
interface WorkoutInfo extends Workout, Omit<WorkoutEntry, 'date|id'> {
	prevDate: string
	prevWorkoutId: number
}

//holds the info that the user inputs about a specific workout like the weights , the intensity, order etc
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
	workouts: WorkoutInfo[]
	activeWorkout: number | null
	activeEntry: number
	state: 'idle' | 'loading' | 'failed '| 'success'
	//get the stats of the last workout of that given type ie push heavy, pull heavy, etc
	previousExerciseEntries: ExerciseEntry[]
	workoutEntry:activeWorkoutInfo
	
}

const initialState = {
	entries: [] as UserEntry[],
	workouts: [] as WorkoutInfo[],
	status: 'idle',
	activeWorkout: null as number,
	activeEntry: null as number,
	previousExerciseEntries: [] as ExerciseEntry[],
	workoutEntry: null as activeWorkoutInfo
}

//get the list of workouts when we initialize the page , 
//ie pull heavy, legs light etc and combine with the last workout of that type that was done
export const getWorkoutAsync = createAsyncThunk(
	'exercise/getWorkout',
	async () => {
		const workoutTemplates = await axios.get('/api/workout-template/')
		const prevWorkouts = (await axios.post('/api/workout-entry', { workoutTemplates })).data as WorkoutEntry[]

		const data = workoutTemplates.data.map((item) => { 
			const prevWorkout = prevWorkouts.find(workout => workout.workoutTemplateId === item.id)
			return {
				...prevWorkout,
				...item,
				//label the workoutEntry id key as prevWorkoutId to avoid conflict with the workoutTemplate id key
				prevWorkoutId: prevWorkout ? prevWorkout.id : null,
			}
		})

		return data
	}
)

//given a workoutID get the template of exercises for that given workout
export const getExerciseTemplates = createAsyncThunk(
	'exercise/getExerciseTemplates',
	async (id:number, {getState}) => { 
		const response = await axios.get('/api/exercise-templates', { params: { workoutId: id } })
		const {exercise:{workouts}} = getState() as AppState
		const prevWorkoutID = workouts.find(workout => workout.id === id)?.prevWorkoutId
		
		const previousExercises = prevWorkoutID
			? await (await axios.get('/api/exercise-entry', { params: { workoutId: prevWorkoutID } })).data as ExerciseEntry[]
			: null
		
		return {
			exercises: response.data,
			workoutId: id,
			previousExercises
		}
	}
)

export const postExerciseEntries = createAsyncThunk(
	'exercise/postExerciseEntries',
	async (arg ,{getState, rejectWithValue}) => {
		const { exercise: { entries, workoutEntry } } = getState() as AppState
		
		if (entries.some(e => e.completed !== true)) {
			console.log('not all entries are completed')
			rejectWithValue({mes:'You must complete all entries before submitting', entries})
		}
		else {
			const response = await axios.post('/api/exercise-entry', { entries, workoutEntry })
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
		},
		editWorkoutNotes: (state, action: PayloadAction<string>) => {
			state.workoutEntry.notes = action.payload
		},
		editWorkoutGrade: (state, action: PayloadAction<number>) => { 
			state.workoutEntry.grade = action.payload
		},
		editPreWorkout: (state, action: PayloadAction<boolean>) => { 
			state.workoutEntry.preWorkout = action.payload
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
						completed: false,
					}
				})
				state.previousExerciseEntries = action.payload.previousExercises

				//initialize the workout entry with the data that we need
				state.workoutEntry = {
					workoutTemplateId: action.payload.workoutId,
					preWorkout: false,
					grade: 0,
					notes: ''
				}
			})
			//posting the exercise entries
			.addCase(postExerciseEntries.pending, (state) => { state.status = 'loading' })
			.addCase(postExerciseEntries.fulfilled, (state) => {
				state.status = 'success'
			})
			.addCase(postExerciseEntries.rejected, (state,) => { 
				state.status = 'failed'
			})
	}
})

export const {
	clearEntries,
	editWeight,
	editOrder,
	editNotes,
	editIntensity,
	setActiveEntry,
	toggleExerciseComplete,
	editWorkoutNotes,
	editWorkoutGrade,
	editPreWorkout,
}
	= exerciseSlice.actions

export const selectWorkouts = (state: AppState) => state.exercise.workouts
export const selectEntries = (state: AppState) => state.exercise.entries
export const selectStatus = (state: AppState) => state.exercise.status
export const selectActiveEntry = (state: AppState) => state.exercise.activeEntry
export const selectPreviousExerciseEntries = (state: AppState) => state.exercise.previousExerciseEntries
export default exerciseSlice.reducer