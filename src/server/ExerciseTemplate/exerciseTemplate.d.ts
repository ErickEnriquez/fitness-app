import { ExerciseTemplate, Movement } from '@prisma/client'

/**Exercise Template with the name of the movement */
export interface ExerciseTemplateTemplateWithName extends ExerciseTemplate{
	movement:Movement
}