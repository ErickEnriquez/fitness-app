import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SerializedCardio } from '@server/cardio'

/**return the cardio data of the given input with the cardioId */
const getCardio = createAsyncThunk(
	'cardio/getPreviousCardioInfo',
	async (cardioId: number, { rejectWithValue }) => {
		try {
			const { data } = await axios.get<SerializedCardio>('/api/cardio', { params: { cardioId } })

			if (!data) return rejectWithValue('Unable to get data')

			return data
		} catch (err) { return rejectWithValue(err) }
	}
)

export default getCardio
