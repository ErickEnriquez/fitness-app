import { WorkoutEntry, ExerciseEntry } from '@prisma/client'
/**
 * same as a workoutEntry item in the prisma schema, only serialize the date to send requests between front and backend
*/
export interface SerializedWorkoutEntry extends Omit<WorkoutEntry, 'date'> {
	date: string
}

export interface WorkoutEntryWithExercises extends SerializedWorkoutEntry {
	exercises: ExerciseEntry[] 
}