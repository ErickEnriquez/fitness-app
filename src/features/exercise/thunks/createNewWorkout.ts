import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppState } from '@app/store'

/**make a request to the server to create a new workout entry and new exercise entries with the workout entry id as its foreign key */
const createNewWorkout = createAsyncThunk(
	'exercise/postExerciseEntries',
	async (_, { getState, rejectWithValue }) => {
		const { exercise: { entries, workoutEntry } } = getState() as AppState
		try {
			const response = await axios.post<void>('/api/exercise-entry', { entries, workoutEntry })
			if(!response) throw Error('error from server')
		} catch (err) {
			console.error(err)
			return rejectWithValue('unable to post workouts , please try later')
		}
	}
)

export default createNewWorkout