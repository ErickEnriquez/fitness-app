import {  createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '@app/store'
import { ExerciseEntry, Workout } from '@prisma/client'
import { getExerciseTemplates, createNewWorkout, getMorePreviousWorkouts, getWorkoutOptionsAsync } from '@features/exercise/thunks'
import { SerializedWorkoutEntry } from '@server/WorkoutEntry/workoutEntry'
import { ExerciseTemplateTemplateWithName } from '@server/ExerciseTemplate/exerciseTemplate'

//this holds the miscellaneous data about the workout that isn't tied to a specific exercise instead the entire workout in general
export interface activeWorkoutInfo {
	notes?: string,
	workoutTemplateId: number,
	preWorkout: boolean,
	grade: number,
}

//combination of workout templates and workout entries, used on the workout options page
export type WorkoutOption = Workout & SerializedWorkoutEntry 

//holds the info that the user inputs about a specific workout like the weights , the intensity, order etc
export interface UserEntry extends ExerciseTemplateTemplateWithName {
	weights: number[],
	intensity?: number,
	notes?: string,
	order?: number,
	completed: boolean
}

type sliceStatus = 'idle' | 'loading' | 'failed' | 'success'
export interface ExerciseState {
	status: sliceStatus
	entries: UserEntry[]
	workoutOptions: WorkoutOption[]
	activeWorkout: number | null
	activeEntry: number
	//get the stats of the last workout of that given type ie push heavy, pull heavy, etc
	previousWorkout: WorkoutEntryWithExercises[]
	workoutEntry: activeWorkoutInfo,
}

export interface WorkoutEntryWithExercises extends SerializedWorkoutEntry {
	exercises: ExerciseEntry[]
}

const initialState = {
	status: 'idle',
	entries: [] as UserEntry[],
	workoutOptions: [] as WorkoutOption[],
	activeWorkout: null as number,
	activeEntry: null as number,
	previousWorkout: [] as WorkoutEntryWithExercises[],
	workoutEntry: null as activeWorkoutInfo,
}

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
			if (isNaN(action.payload.value) || action.payload.value > 10 || action.payload.value < 1) return
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
			if (isNaN(action.payload) || action.payload > 10 || action.payload < 1) return
			state.workoutEntry.grade = action.payload
		},
		editPreWorkout: (state, action: PayloadAction<boolean>) => {
			state.workoutEntry.preWorkout = action.payload
		},
		clearStatus: (state) => {
			state.status = 'idle'
		},
		removePreviousWorkout: (state) => {
			state.previousWorkout.pop()
		},
		resetState: () => initialState
	},
	extraReducers: (builder) => {
		builder
			//================ getting list of the workouts ===========================================
			.addCase(getWorkoutOptionsAsync.pending, (state) => { state.status = 'loading' })
			.addCase(getWorkoutOptionsAsync.rejected, (state) => { state.status = 'failed' })
			.addCase(getWorkoutOptionsAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.workoutOptions = action.payload
			})
			//================ getting the workout template for a workout ============================
			.addCase(getExerciseTemplates.pending, (state) => { state.status = 'loading' })
			.addCase(getExerciseTemplates.fulfilled, (state, action) => {
				state.status = 'idle'
				//mark the type of workout that we are doing
				state.activeWorkout = action.payload.workoutId
				//create the entries for the workout
				state.entries = action.payload.exercises.map((entry: ExerciseTemplateTemplateWithName) => ({
					...entry,
					weights: Array(entry.sets).fill(''),
					intensity: 0,
					notes: '',
					order: 0,
					completed: false,
				}
				))
				state.previousWorkout = [action.payload.previousWorkout]
				//initialize the workout entry with the data that we need
				state.workoutEntry = {
					workoutTemplateId: action.payload.workoutId,
					preWorkout: false,
					grade: 0,
					notes: ''
				}
			})
			.addCase(getExerciseTemplates.rejected, (state) => { state.status = 'failed' })
			//================= posting the exercise entries =====================================
			.addCase(createNewWorkout.pending, (state) => { state.status = 'loading' })
			.addCase(createNewWorkout.fulfilled, (state) => { state.status = 'success' })
			.addCase(createNewWorkout.rejected, (state) => { state.status = 'failed' })
			//================= getting more previous workouts =====================================
			.addCase(getMorePreviousWorkouts.pending, (state) => { state.status = 'loading' })
			.addCase(getMorePreviousWorkouts.rejected, (state) => { state.status = 'failed' })
			.addCase(getMorePreviousWorkouts.fulfilled, (state, action) => {
				state.status = 'idle'
				state.previousWorkout.push(action.payload)
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
	clearStatus,
	removePreviousWorkout,
	resetState
}
	= exerciseSlice.actions

export const selectWorkouts = (state: AppState) => state.exercise.workoutOptions
export const selectEntries = (state: AppState) => state.exercise.entries
export const selectStatus = (state: AppState) => state.exercise.status as sliceStatus
export const selectActiveEntry = (state: AppState) => state.exercise.activeEntry
export const selectActiveWorkout = (state: AppState) => state.exercise.activeWorkout
export const selectPreviousExerciseEntries = (state: AppState) => state.exercise.previousWorkout
export default exerciseSlice.reducer