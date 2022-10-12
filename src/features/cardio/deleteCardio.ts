import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppState } from '@app/store'

/**
 * send a delete request to the server to delete the cardio entry of the given cardio id
 */
const deleteCardio = createAsyncThunk(
	'cardio/deleteCardioEntry',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { cardio } = getState() as AppState
			const req = await axios.delete('/api/cardio', { params: { cardioId: cardio.completedCardioId } })
			if (!req) return rejectWithValue('Error deleting entry')

		} catch (err) {
			console.error(err)
			return rejectWithValue('Error has occurred, please try again later')
		}
	}
)

export default deleteCardio