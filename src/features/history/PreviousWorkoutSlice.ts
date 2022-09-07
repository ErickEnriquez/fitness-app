import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import type { AppState } from '@app/store'
import { WorkoutEntry, ExerciseEntry, ExerciseTemplate, Movement } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'

//expand the ExerciseEntry field to include the name of the exercise as well as the number of sets
export interface PreviousExercise extends ExerciseEntry {
	name: string,
	reps: number
	editable: boolean
}

type sliceStatus = 'idle' | 'loading' | 'failed' | 'success'
export interface PreviousWorkoutState {
	status: sliceStatus
	workout: WorkoutEntry
	exercises: PreviousExercise[]
	changed: boolean
}


const initialState = {
	status: 'idle',
	workout: null as WorkoutEntry,
	exercises: [] as PreviousExercise[],
	changed: false
}

/**
 * given a workoutId, return the workout that corresponds to it as well as the exercises that were performed as part of the workout
 */
export const getWorkoutDataAsync = createAsyncThunk(
	'previousWorkout/getWorkoutData',
	async (workoutId: number, { rejectWithValue }) => {
		try {
			const response = await Promise.all([
				//get the previousWorkout
				axios.get('/api/workout-entry', { params: { Id: workoutId } }),
				// get the exercise for the workout
				axios.get('/api/exercise-entry', { params: { workoutId } })
			])

			const exercises = response[1].data as ExerciseEntry[]
			const prevWorkout = response[0].data as WorkoutEntry

			const templates = await Promise.all(exercises
				.map(exercise => axios.get('/api/exerciseEntry', { params: { exerciseId: exercise.exerciseID } }))
			).then(r => r.map(t => t.data)) as ExerciseTemplate[]

			const movements = await Promise.all(templates.map(template => {
				return axios.get('/api/movement', { params: { movementId: template.movementID } })
			})).then(r => r.map(m => m.data)) as Movement[]

			const data = exercises.map((e, idx) => ({
				...e,
				reps: templates[idx].reps,
				name: movements[idx].name,
				editable: false
			})) as PreviousExercise[]

			return { exercises: data, workout: prevWorkout }
		} catch (err) {
			console.error(err)
			return rejectWithValue(err)
		}
	}
)



export const PreviousWorkoutSlice = createSlice({
	name: 'previousWorkout',
	initialState,
	reducers: {
		clearStatus: (state) => {
			state.status = 'idle'
		},
		resetState: () => initialState,
		editWorkoutNotes: (state, action: PayloadAction<string>) => {
			state.workout.notes = action.payload
			state.changed = true
		},
		editWorkoutIntensity: (state, action: PayloadAction<number>) => {
			state.workout.grade = action.payload
			state.changed = true
		},
		editWorkoutOrder: (state) => {
			state.workout.preWorkout = !state.workout.preWorkout
			state.changed = true
		},
		editExerciseNotes: (state, action: PayloadAction<{ text: string, idx: number }>) => {
			const { text, idx } = action.payload
			state.exercises[idx].notes = text
			state.changed = true
		},
		editExerciseWeight: (state, action: PayloadAction<{ weight: number, exerciseIdx: number, setNumber: number }>) => {
			const { weight, exerciseIdx, setNumber } = action.payload
			state.exercises[exerciseIdx].weights[setNumber] = weight as unknown as Decimal
			state.changed = true
		},
		editExerciseIntensity: (state, action: PayloadAction<{ idx: number, val: number }>) => {
			const { idx, val } = action.payload
			if (isNaN(val) || val > 10) return
			state.exercises[idx].intensity = val
			state.changed = true
		},
		editExerciseOrder: (state, action: PayloadAction<{ idx: number, val: number }>) => {
			const { idx, val } = action.payload
			if (isNaN(val) || val <= 0) return
			state.exercises[idx].order = val
			state.changed = true
		},
		toggleEditable: (state, action: PayloadAction<number>) => {
			state.exercises[action.payload].editable = !state.exercises[action.payload].editable
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getWorkoutDataAsync.pending, state => { state.status = 'loading' })
			.addCase(getWorkoutDataAsync.rejected, state => { state.status = 'failed' })
			.addCase(getWorkoutDataAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.exercises = action.payload.exercises.sort((a, b) => a.order - b.order)
				state.workout = action.payload.workout
			})
	},
})

export const {
	clearStatus,
	resetState,
	editWorkoutNotes,
	editExerciseNotes,
	editExerciseWeight,
	toggleEditable,
	editExerciseIntensity,
	editExerciseOrder,
	editWorkoutIntensity,
	editWorkoutOrder
} = PreviousWorkoutSlice.actions

export const selectStatus = (state: AppState) => state.previousWorkout.status as sliceStatus
export const selectWorkout = (state: AppState) => state.previousWorkout.workout
export const selectExercises = (state: AppState) => state.previousWorkout.exercises
export const selectChanged = (state: AppState) => state.previousWorkout.changed


export default PreviousWorkoutSlice.reducer