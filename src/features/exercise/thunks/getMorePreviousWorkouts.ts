import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { WorkoutEntryWithExercises } from '@server/WorkoutEntry/workoutEntry'
/**
 * get more previous workouts of the same workoutTemplateType to show older results
 */
const getMorePreviousWorkout = createAsyncThunk(
	'exercise/getMorePreviousWorkouts',
	async ({ skip, workoutTemplateId }:{skip:number, workoutTemplateId:number}, { rejectWithValue }) => {
		try {			
			const workout = await axios.get<WorkoutEntryWithExercises>('/api/workout-entry', { params: { workoutType: workoutTemplateId, skip } })
			if (!workout.data) return rejectWithValue('no readings found')
			return workout.data
		} catch (err) {
			console.error('No Readings Found')
			return rejectWithValue('No Readings Found')
		}
	}
)

export default getMorePreviousWorkout