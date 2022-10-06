import React from 'react'
import Layout from '@components/Layout'


import Card from '@components/Card'
import NumberInput from '@components/NumberInput'
import Notes from '@components/Notes'
import Button from '@components/util/Button'

import { useAppSelector, useAppDispatch } from '@app/hooks'
import {
	selectCardioState,
	editCardioIntensity,
	editCaloriesBurned,
	editCardioType,
	editDistance,
	editTime,
	editCardioNotes,
	submitCardioInfo,
	selectStatus,
	resetState
} from '@features/cardio/CardioSlice'


import { CardioType } from '@prisma/client'

const workoutOptions = [CardioType.bike, CardioType.run, CardioType.climbing, CardioType.elliptical, CardioType.hike, CardioType.rowing, CardioType.sport, CardioType.stairs, CardioType.swim, CardioType.other]

const Cardio = (): JSX.Element => {

	const { intensity, caloriesBurned, distance, time, notes } = useAppSelector(selectCardioState)
	const pageStatus = useAppSelector(selectStatus)

	const dispatch = useAppDispatch()

	return (
		<Layout
			pageStatus={pageStatus}
			failHandler={() => dispatch(resetState())}
			successHandler={() => dispatch(resetState())}
		>
			<main className="text-center my-4 py-4">
				<h1 className="text-white col-span-3 mx-auto text-3xl capitalize font-bold bg-light-gray px-8 py-1 rounded-2xl w-11/12 ">Enter Cardio Details</h1>
				<div className='flex flex-col my-2 py-2  text-center'>
					<Card title='Cardio Type'>
						<div className="mt-4 my-6 ">
							<select
								name="cardio-type" id="type"
								onChange={e => dispatch(editCardioType(e.target.value))}
								className='outline mt-4 outline-primary-blue outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
							>
								<option value="">Select an option</option>
								{workoutOptions.map(option => (
									<option
										key={option}
										value={option}>{option}</option>
								))}
							</select>
						</div>
					</Card>
					<br />
					<Card title='Details'>
						<div className='grid grid-cols-2 my-4'>
							<NumberInput
								title='Intensity'
								name={'Intensity'}
								num={intensity}
								changeHandler={e => dispatch(editCardioIntensity(Number(e.target.value)))}
							/>
							<NumberInput
								title='Calories'
								name={'Calories'}
								num={caloriesBurned}
								changeHandler={e => dispatch(editCaloriesBurned(Number(e.target.value)))}
							/>
						</div>

						<div className='grid grid-cols-2 my-4'>
							<NumberInput
								title='Distance'
								name={'Distance'}
								num={distance}
								changeHandler={e => dispatch(editDistance(Number(e.target.value)))}
							/>
							<NumberInput
								title='Time'
								name={'Time'}
								num={time}
								changeHandler={e => dispatch(editTime(Number(e.target.value)))}
							/>
						</div>
					</Card>

				</div>
				<Card >
					<Notes
						val={notes}
						changeHandler={e => dispatch(editCardioNotes(e.target.value))}
					/>
					<br />
					<Button
						color='primary-green'
						text='Submit'
						clickHandler={() => dispatch(submitCardioInfo())}
					/>
				</Card>
			</main>
		</Layout >
	)
}

export default Cardio