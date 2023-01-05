import {  createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '@app/store'
import { ExerciseEntry, ExerciseTemplate, Program, WorkoutTemplate, WorkoutEntry } from '@prisma/client'
import { LastWorkoutEntry } from '@server/getLastWorkoutOfType'

//this holds the miscellaneous data about the workout that isn't tied to a specific exercise instead the entire workout in general
export interface activeWorkoutInfo {
	notes?: string,
	workoutTemplateId: string,
	preWorkout: boolean,
	grade: number,
}


//combination of workout templates and workout entries, 
interface WorkoutInfo extends WorkoutTemplate, Omit<WorkoutEntry, 'date|id'> {
	prevDate: string
	prevWorkoutId: string
}

//holds the info that the user inputs about a specific workout like the weights , the intensity, order etc
export interface UserEntry extends ExerciseTemplate {
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
	workouts: WorkoutInfo[]
	activeWorkout: string
	activeEntry: string
	//get the stats of the last workout of that given type ie push heavy, pull heavy, etc
	previousWorkout: WorkoutEntryWithExercises[]
	workoutEntry: activeWorkoutInfo,
}

export interface WorkoutEntryWithExercises extends SerializedWorkoutEntry {
	exercises: ExerciseEntry[]
}

const initialState:ExerciseState = {
	status: 'idle',
	entries: [] as UserEntry[],
	workouts: [] as WorkoutInfo[],
	activeWorkout: null,
	activeEntry: null,
	previousWorkout: [] as PreviousWorkout[],
	workoutEntry: null as activeWorkoutInfo,
}

//get the list of workouts when we initialize the page , 
//ie pull heavy, legs light etc and combine with the last workout of that type that was done
export const getWorkoutAsync = createAsyncThunk(
	'exercise/getWorkout',
	async (_, { rejectWithValue }) => {
		try {

			const { id } = await axios.get('/api/program')
				.then(d => d.data)
				.catch(err => {
					throw Error(err)
				}) as Program

			const workoutTemplates = await axios.get('/api/workout-template', { params: { programId: id } })
				.then(r => r.data)
				.catch(err => {
					throw Error(err)
				}) as WorkoutTemplate[]

			const prevWorkouts = await Promise.all(workoutTemplates.map(workout => axios.get('/api/workout-entry', { params: { workoutType: workout.id, skip: 0 } })))
				.then(list => list.map(item => item.data))
				.catch(err => {
					console.error(err)
				}) as WorkoutEntry[]

			const data = workoutTemplates.map((item) => {
				const prevWorkout = prevWorkouts && prevWorkouts.find(workout => workout.workoutTemplateId === item.id)
				return {
					...prevWorkout,
					...item,
					//label the workoutEntry id key as prevWorkoutId to avoid conflict with the workoutTemplate id key
					prevWorkoutId: prevWorkout ? prevWorkout.id : null,
				}
			}) as WorkoutInfo[]

			return data
		}
		catch (err) {
			console.error(err)
			return rejectWithValue('Unable to get workout async')
		}
	}
)

//given a workoutID get the template of exercises for that given workout
export const getExerciseTemplates = createAsyncThunk(
	'exercise/getExerciseTemplates',
	async (id: string, { getState, rejectWithValue }) => {
		try {
			const { exercise: { workouts } } = getState() as AppState
			const prevWorkoutID = workouts.find(workout => workout.id === id)?.prevWorkoutId

			const prevMeta = await axios.get<LastWorkoutEntry>('/api/workout-entry', { params: { Id: prevWorkoutID } })
				.then(r => r.data)
				.catch(err => console.error(err)
				)

			const [exercisesList, prevExercises] = await Promise.all([
				axios.get('/api/exercise-templates', { params: { workoutId: id } }),
				axios.get<ExerciseEntry>('/api/exercise-entry', { params: { workoutId: prevWorkoutID } })
			]).then(list => ([
				list[0].data,
				list[1].data as ExerciseEntry
			]))

			const previousWorkout: PreviousWorkout = prevWorkoutID && prevMeta && { ...prevMeta, date: prevMeta.date, exercises: prevExercises }

			return {
				exercises: exercisesList,
				workoutId: id,
				previousWorkout
			}
		} catch (err) {
			console.error(err)
			return rejectWithValue('Unable to get exercises')
		}
	}
)

/**
 * get more previous workouts of the same type to show older results
 */
export const getMorePreviousWorkouts = createAsyncThunk(
	'exercise/getMorePreviousWorkouts',
	async (skipNum: number, { getState, rejectWithValue }) => {
		try {
			const { exercise: { activeWorkout } } = getState() as AppState
			const workout = await axios.get('/api/workout-entry', { params: { workoutType: activeWorkout, skip: skipNum } })
			if (!workout.data) return rejectWithValue('no readings found')
			return workout.data
		} catch (err) {
			console.error('No Readings Found')
			return rejectWithValue('No Readings Found')
		}
	}
)

export const postExerciseEntries = createAsyncThunk(
	'exercise/postExerciseEntries',
	async (_, { getState, rejectWithValue }) => {
		const { exercise: { entries, workoutEntry } } = getState() as AppState
		try {
			const response = await axios.post('/api/exercise-entry', { entries, workoutEntry })
			return response.data
		} catch (err) {
			console.error(err)
			return rejectWithValue('unable to post workout data , please try later')
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
		editWeight: (state, action: PayloadAction<{ movementId: string, value: number, setNumber: number }>) => {
			if (isNaN(action.payload.value)) return
			state.entries.find(entry => entry.movementId === action.payload.movementId).weights[action.payload.setNumber] = action.payload.value
		},
		editOrder: (state, action: PayloadAction<{ movementId: string, value: number }>) => {
			if (isNaN(action.payload.value)) return
			state.entries.find(entry => entry.movementId === action.payload.movementId).order = action.payload.value
		},
		editNotes: (state, action: PayloadAction<{ movementId: string, value: string }>) => {
			state.entries.find(entry => entry.movementId === action.payload.movementId).notes = action.payload.value
		},
		editIntensity: (state, action: PayloadAction<{ movementId: string, value: number }>) => {
			if (isNaN(action.payload.value) || action.payload.value > 10 || action.payload.value < 1) return
			state.entries.find(entry => entry.movementId === action.payload.movementId).intensity = action.payload.value
		},
		//set the active entry we are working on when given an ID
		setActiveEntry(state, action: PayloadAction<string>) {
			state.activeEntry = state.entries.find(entry => entry.id === action.payload).id
		},
		toggleExerciseComplete(state, action: PayloadAction<string>) {
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
				state.activeWorkout = action.payload.templateId
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
				state.activeWorkoutName = action.payload.workoutName
				//initialize the workout entry with the data that we need
				state.workoutEntry = {
					workoutTemplateId: action.payload.templateId,
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
export const selectActiveWorkoutName = (state:AppState) => state.exercise.activeWorkoutName
export const selectPreviousExerciseEntries = (state: AppState) => state.exercise.previousWorkout
export const selectWorkoutTemplateId = (state: AppState) => state.exercise.workoutEntry.workoutTemplateId
export default exerciseSlice.reducer