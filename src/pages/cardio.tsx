import React from 'react'
import Layout from '@components/Layout'

import Loading from '@components/Loading'
import Success from '@components/Success'
import Fail from '@components/Fail'
import Card from '@components/Card'
import NumberInput from '@components/NumberInput'
import Notes from '@components/Notes'
import SubmitBtn from '@components/SubmitBtn'
import SignIn from '@components/SignIn'

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
	clearCardioState,
	selectStatus
} from '@features/cardio/CardioSlice'

import { useSession } from 'next-auth/react'

import { CardioType } from '@prisma/client'

const workoutOptions = [CardioType.bike, CardioType.run, CardioType.climbing, CardioType.elliptical, CardioType.hike, CardioType.rowing, CardioType.sport, CardioType.stairs, CardioType.swim, CardioType.other]

const Cardio = (): JSX.Element => {

	const { data, status } = useSession()

	const { intensity, caloriesBurned, distance, time, notes } = useAppSelector(selectCardioState)
	const pageStatus = useAppSelector(selectStatus)

	const dispatch = useAppDispatch()


	if (pageStatus === 'loading' || status === 'loading') return <Layout><Loading /></Layout>
	else if (status === 'unauthenticated') return <SignIn />
	else if (pageStatus === 'failed') return <Layout><Fail clickHandler={() => dispatch(clearCardioState())} /></Layout>
	else if (pageStatus === 'success') return <Layout><Success clickHandler={() => dispatch(clearCardioState())} /></Layout>
	return (
		<Layout>
			<main className="text-center my-4 py-4">
				<Card title="Enter Cardio Details"
					style={{ textDecoration: 'underline' }}
				>
					<div className='flex flex-col my-2 py-2 w-11/12 mx-auto text-center'>
						<span className="mt-4 my-6">
							<label htmlFor="cardio-type" className='text-white text-lg font-bold'>Cardio Type</label>
							<select
								name="cardio-type" id="type"
								onChange={e => dispatch(editCardioType(e.target.value))}
								className='outline mt-4 outline-cyan-700 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
							>
								<option value="">Select an option</option>
								{workoutOptions.map(option => (
									<option
										key={option}
										value={option}>{option}</option>
								))}
							</select>
						</span>
						<div className='grid grid-cols-2'>
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
					</div>
					<Notes
						val={notes}
						changeHandler={e => dispatch(editCardioNotes(e.target.value))}
					/>
					<br />
					<SubmitBtn
						clickHandler={() => dispatch(submitCardioInfo())}
					/>
				</Card>
			</main>
		</Layout >
	)
}

export default Cardio