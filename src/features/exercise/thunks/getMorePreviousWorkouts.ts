import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { WorkoutEntryWithExercises } from '@server/WorkoutEntry/workoutEntry'
import type { AppState } from '@app/store'
/**
 * get more previous workouts of the same workoutTemplateType to show older results
 */
const getMorePreviousWorkout = createAsyncThunk(
	'exercise/getMorePreviousWorkouts',
	async ( skip:number, { rejectWithValue , getState}) => {
		try {			
			const {exercise:{activeEntry}} = getState() as AppState
			const workout = await axios.get<WorkoutEntryWithExercises>('/api/workout-entry', { params: { workoutType: activeEntry, skip } })
			if (!workout.data) return rejectWithValue('no readings found')
			return workout.data
		} catch (err) {
			console.error('No Readings Found')
			return rejectWithValue('No Readings Found')
		}
	}
)

export default getMorePreviousWorkout