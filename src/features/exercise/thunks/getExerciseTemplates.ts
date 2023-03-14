import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppState } from '@app/store'
import { ExerciseTemplateTemplateWithName } from '@server/ExerciseTemplate/exerciseTemplate'
import { SerializedWorkoutEntry } from '@server/WorkoutEntry/workoutEntry'
import { ExerciseEntry } from '@prisma/client'
import { WorkoutEntryWithExercises } from '../ExerciseSlice'

//get the list of workouts when we initialize the page , 
//ie pull heavy, legs light etc and combine with the last workout of that type that was done

//given a workoutID get the template of exercises for that given workout
const getExerciseTemplates = createAsyncThunk(
	'exercise/getExerciseTemplates',
	async ({templateId}: {templateId:string}, { getState, rejectWithValue }) => {
		try {

			const { exercise: { workoutOptions } } = getState() as AppState
			const prevWorkoutEntry = workoutOptions.find(workout => workout.id === templateId)

			const queries = await Promise.allSettled([
				axios.get<ExerciseTemplateTemplateWithName[]>('/api/exercise-templates', { params: { workoutId: templateId } }),
				axios.get<SerializedWorkoutEntry>(`/api/workout-entry/${prevWorkoutEntry.prevWorkoutId}`),
				axios.get<ExerciseEntry[]>('/api/exercise-entry', { params: { workoutId: prevWorkoutEntry.prevWorkoutId } })
			])
			
			// grab the data from the queries, if they have been rejected, set the variable to null
			const exercises = queries[0].status === 'fulfilled' ? queries[0].value.data as ExerciseTemplateTemplateWithName[] : null
			const prevMeta = queries[1].status ==='fulfilled' ? queries[1].value.data as SerializedWorkoutEntry : null
			const prevExercises = queries[2].status === 'fulfilled' ?  queries[2].value.data as ExerciseEntry[] : null
			
			const previousWorkout: WorkoutEntryWithExercises = templateId && { ...prevMeta, exercises: prevExercises }

			return {
				exercises,
				previousWorkout,
				templateId,
				workoutName:workoutOptions.find(option => option.id === templateId).name
			}
		} catch (err) {
			console.error(err)
			return rejectWithValue('Unable to get exercises')
		}
	}
)

export default getExerciseTemplates
