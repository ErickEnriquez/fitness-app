import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {  ExerciseEntry } from '@prisma/client'
import {  PreviousWorkout} from '../ExerciseSlice'
import type { AppState } from '@app/store'
import { LastWorkoutEntry } from '@server/getLastWorkoutOfType'
import { ExerciseTemplateTemplateWithName } from '@server/ExerciseTemplate/exerciseTemplate'

//get the list of workouts when we initialize the page , 
//ie pull heavy, legs light etc and combine with the last workout of that type that was done


//given a workoutID get the template of exercises for that given workout
const getExerciseTemplates = createAsyncThunk(
	'exercise/getExerciseTemplates',
	async (id: number, { getState, rejectWithValue }) => {
		try {
			const { exercise: { workoutOptions } } = getState() as AppState
			const prevWorkoutId = workoutOptions.find(workout => workout.id === id)?.id

			const [exercisesList, prevMeta, prevExercises] = await Promise.all([
				axios.get<ExerciseTemplateTemplateWithName[]>('/api/exercise-templates', { params: { workoutId: id } }),
				axios.get('/api/workout-entry', { params: { Id: prevWorkoutId } }),
				axios.get('/api/exercise-entry', { params: { workoutId: prevWorkoutId } })
			]).then(list => ([
				list[0].data,
				list[1].data as LastWorkoutEntry,
				list[2].data as ExerciseEntry
			]))

			const previousWorkout: PreviousWorkout = prevWorkoutId && { ...prevMeta, date: prevMeta.date, exercises: prevExercises }

			return {
				exercises: exercisesList,
				workoutId: id,
				previousWorkout
			}
		} catch (err) {
			console.error(err)
			return rejectWithValue('Unable to get exercises')
		}
	}
)

export default getExerciseTemplates
