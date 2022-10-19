import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Program, Workout } from '@prisma/client'
import { SerializedWorkoutEntry } from '@server/WorkoutEntry/workoutEntry'
import { WorkoutOption } from '../ExerciseSlice'

const getWorkoutOptionsAsync = createAsyncThunk(
	'exercise/getWorkout',
	async (_, { rejectWithValue }) => {
		try {

			const { id } = (await axios.get<Program>('/api/program')).data
			if (!id) throw Error('unable to get program')

			const workoutTemplates = (await axios.get<Workout[]>('/api/workout-template', { params: { programId: id } })).data
			if(!workoutTemplates) throw Error ('unable to get workout')

			const prevWorkouts = await Promise.all(
				workoutTemplates.map(workout => (
					axios.get<SerializedWorkoutEntry>('/api/workout-entry', { params: { workoutType: workout.id, skip: 0 } }
					))
				)).then(l => l.map(i => i.data))
			
			if(!prevWorkouts) throw Error('unable to get previous workouts entries')
		
			const data:WorkoutOption[] = workoutTemplates.map((item) => {
				const prevWorkout = prevWorkouts.find(workout => workout.workoutTemplateId === item.id)
				return {
					...prevWorkout,
					...item
				}
			}) 
			return data
		}
		catch (err) {
			console.error(err)
			return rejectWithValue('Unable to get workout async')
		}
	}
)

export default getWorkoutOptionsAsync