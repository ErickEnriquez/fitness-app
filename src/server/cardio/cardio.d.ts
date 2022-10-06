/**
 * get all of the cardio's for given user between the given dates
 * @param startDate 
 * @param endDate 
 * @param userID 
 */

export interface PreviousCardio extends Omit<Cardio, 'timeCreated'> {
	timeCreated: string
}