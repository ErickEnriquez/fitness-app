import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppState } from '@app/store'
import { SerializedCardio } from '@server/cardio'
/**
 * send the updated state to the DB and update the cardio info with whatever was changed
 */
const updateCardio = createAsyncThunk(
	'cardio/updatePreviousCardioInfo',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { cardio } = getState() as AppState
			const { intensity, time, caloriesBurned, distance, notes, completedCardioId } = cardio

			const { data } = await axios.put<SerializedCardio>('/api/cardio', { intensity, time, caloriesBurned, distance, notes, completedCardioId })
			if (!data) return rejectWithValue('Error updating cardio info')

			return data
		}
		catch (err) {
			console.error(err)
			return rejectWithValue('Error has occurred, please try again later')
		}
	}
)

export default updateCardio