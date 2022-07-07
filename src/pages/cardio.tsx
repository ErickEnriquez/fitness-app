import React from 'react'
import Layout from '@features/layout/Layout'

import Loading from '@components/Loading'
import Success from '@components/Success'
import Fail from '@components/Fail'
import Card from '@components/Card'

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
	clearCardioState
} from '@features/cardio/CardioSlice'

import { CardioType } from '@prisma/client'

const workoutOptions = [CardioType.bike, CardioType.run, CardioType.climbing, CardioType.elliptical, CardioType.hike, CardioType.rowing, CardioType.sport, CardioType.stairs, CardioType.swim, CardioType.other]

const Cardio = (): JSX.Element => {

	const { intensity, caloriesBurned, distance, time, notes, status } = useAppSelector(selectCardioState)

	const dispatch = useAppDispatch()

	if (status === 'loading') return <Layout><Loading /></Layout>
	else if (status === 'failed') return <Layout><Fail clickHandler={() => dispatch(clearCardioState())} /></Layout>
	else if (status === 'success') return <Layout><Success clickHandler={() => dispatch(clearCardioState())} /></Layout>

	return (
		<Layout>
			<main className="text-center pt-4">
				<Card title="Enter Cardio Details"
					style={{ 'textDecoration': 'underline' }}
				>
					<div className='flex flex-col my-2 py-2 w-11/12 mx-auto text-center'>
						<span className="mt-4 my-6">
							<label htmlFor="cardio-type" className='text-white text-lg font-bold'>Cardio Type</label>
							<select
								name="cardio-type" id="type"
								onChange={e => dispatch(editCardioType(e.target.value))}
								className='outline mt-4 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
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
							<span>
								<label htmlFor="intensity" className='text-white text-lg font-bold'>Intensity</label>
								<input type="number"
									min={0} max={10}
									name="intensity"
									placeholder='1-10'
									value={intensity}
									onChange={e => dispatch(editCardioIntensity(Number(e.target.value)))}
									className='outline mt-4 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
								/>
							</span>
							<span>
								<label htmlFor="calories" className='text-white text-lg font-bold'>Calories Burned</label>
								<input type="number"
									min={0} max={5000}
									name="calories"
									placeholder='cals'
									value={caloriesBurned}
									onChange={e => dispatch(editCaloriesBurned(Number(e.target.value)))}
									className='outline mt-4 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
								/>
							</span>
						</div>
						<div className='grid grid-cols-2 my-4'>
							<span>
								<label htmlFor="distance" className='text-white text-lg font-bold'>Distance</label>
								<input type="number"
									placeholder="miles"
									name='distance'
									value={distance}
									onChange={e => dispatch(editDistance(Number(e.target.value)))}
									className='outline my-6 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'

								/>
							</span>
							<span>
								<label htmlFor="time" className='text-white text-lg font-bold'>Time</label>
								<input type="number"
									placeholder="mins"
									name='time'
									value={time}
									onChange={e => dispatch(editTime(Number(e.target.value)))}
									className='outline my-6 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
								/>
							</span>

						</div>
					</div>
					<label htmlFor="cardio-notes" className='text-white text-lg font-bold'>Notes</label>
					<textarea name="cardio-notes"
						id="" rows={10}
						value={notes}
						onChange={e => dispatch(editCardioNotes(e.target.value))}
						className='outline my-6 outline-yellow-400 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
						placeholder='Any Notes to add'>
					</textarea>
					<br />
					<button type="submit"
						className='text-white bg-green-500 rounded-full w-11/12 mx-auto hover:bg-white hover:text-green-500 hover:outline outline-green-500 my-4 h-12'
						onClick={() => dispatch(submitCardioInfo())}
					>
						Submit
					</button>
				</Card>
			</main>
		</Layout >
	)
}

export default Cardio