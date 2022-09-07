import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
// import thunkMiddleware from 'redux-thunk'

import exerciseReducer from '../features/exercise/ExerciseSlice'
import CalendarReducer from '@features/calendar/CalendarSlice'
import CardioReducer from '@features/cardio/CardioSlice'
import PreviousWorkoutReducer from '@features/history/PreviousWorkoutSlice'

const reducers = combineReducers({
	exercise: exerciseReducer,
	calendar: CalendarReducer,
	cardio: CardioReducer,
	previousWorkout: PreviousWorkoutReducer
})

const persistConfig = {
	whiteList: ['exercise'],
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export function makeStore() {
	return configureStore({
		reducer: persistedReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
	})
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>

export default store
