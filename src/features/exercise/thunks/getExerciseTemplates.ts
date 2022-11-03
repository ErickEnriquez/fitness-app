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
	async ({templateId, prevWorkoutId}: {templateId:number, prevWorkoutId:number}, { getState, rejectWithValue }) => {
		try {
			const { exercise: { workoutOptions } } = getState() as AppState
			const prevWorkoutEntry = workoutOptions.find(workout => workout.id === prevWorkoutId)


			const queries = await Promise.all([
				axios.get<ExerciseTemplateTemplateWithName[]>('/api/exercise-templates', { params: { workoutId: prevWorkoutEntry.workoutTemplateId } }),
				axios.get<SerializedWorkoutEntry>(`/api/workout-entry/${prevWorkoutEntry.id}`),
				axios.get<ExerciseEntry[]>('/api/exercise-entry', { params: { workoutId: prevWorkoutEntry.id } })
			]).then(l => l.map(r => r.data))		

			
			const exercises = queries[0] as ExerciseTemplateTemplateWithName[]
			const prevMeta = queries[1] as SerializedWorkoutEntry
			const prevExercises = queries[2] as ExerciseEntry[]
			
			const previousWorkout: WorkoutEntryWithExercises = prevWorkoutId && { ...prevMeta, exercises: prevExercises }

			return {
				exercises,
				prevWorkoutId,
				previousWorkout,
				templateId
			}
		} catch (err) {
			console.error(err)
			return rejectWithValue('Unable to get exercises')
		}
	}
)

export default getExerciseTemplates
