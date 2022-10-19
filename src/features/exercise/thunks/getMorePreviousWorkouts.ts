import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppState } from '@app/store'
/**
 * get more previous workouts of the same type to show older results
 */
const getMorePreviousWorkouts = createAsyncThunk(
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

export default getMorePreviousWorkouts