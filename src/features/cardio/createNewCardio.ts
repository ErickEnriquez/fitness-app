import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppState } from '@app/store'

/**take input and upload result to DB */
const createNewCardio = createAsyncThunk(
	'cardio/submitCardio',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { cardio } = getState() as AppState
			//remove selected cardio id from object, since we don't want it when submitting a new cardio
			const { intensity, time, caloriesBurned, distance, notes, cardioType } = cardio
			await axios.post('/api/cardio', { intensity, time, caloriesBurned, distance, notes, cardioType })
		} catch (err) { return rejectWithValue(err) }
	}
)

export default createNewCardio