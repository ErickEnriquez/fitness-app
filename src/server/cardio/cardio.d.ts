import { Cardio } from '@prisma/client'
/**
 * same as a cardio item in the prisma schema, only serialize the date to send requests between front and backend
 * serialize the time created field from a date to a string, when communicating with front and back end
*/
export interface SerializedCardio extends Omit<Cardio, 'timeCreated'> {
	timeCreated: string
}