import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppState } from '@app/store'

const postExerciseEntries = createAsyncThunk(
	'exercise/postExerciseEntries',
	async (_, { getState, rejectWithValue }) => {
		const { exercise: { entries, workoutEntry } } = getState() as AppState
		try {
			const response = await axios.post('/api/exercise-entry', { entries, workoutEntry })
			return response.data
		} catch (err) {
			console.error(err)
			return rejectWithValue('unable to post workouts , please try later')
		}
	}
)

export default postExerciseEntries