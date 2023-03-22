import React from 'react'
import Layout from '@components/Layout'

import { useForm, SubmitHandler } from 'react-hook-form'
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


import { Cardio, CardioType } from '@prisma/client'

const workoutOptions = [CardioType.bike, CardioType.run, CardioType.climbing, CardioType.elliptical, CardioType.hike, CardioType.rowing, CardioType.sport, CardioType.stairs, CardioType.swim, CardioType.other]

export type CardioFormInputs =  Pick<Cardio, 'caloriesBurned'| 'distance' | 'type' | 'time' | 'intensity' | 'notes'>

const Cardio = (): JSX.Element => {

	const pageStatus = useAppSelector(selectStatus)

	const dispatch = useAppDispatch()
	const onSubmit: SubmitHandler<CardioFormInputs> = data => {
		dispatch(submitCardioInfo(data))
	}
	const { register, formState: { errors }, handleSubmit } = useForm<CardioFormInputs>()

	return (
		<Layout
			pageStatus={pageStatus}
			failHandler={() => dispatch(resetState())}
			successHandler={() => dispatch(resetState())}>
		
			<main className="text-center my-4 py-4">
				<h1 className="text-white col-span-3 mx-auto text-3xl capitalize font-bold bg-dark-gray px-8 py-1 rounded-2xl w-11/12 ">Enter Cardio Details</h1>
				<br />
				<form onSubmit={handleSubmit(onSubmit)}>
					<Card title='Cardio Type'>
						<div className="mt-4 my-6 ">
							<select
								{...register('type', { required: {value:true, message:'Required'} })}
								className='outline mt-4 outline-primary-blue outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
							>
								<option value="">Select an option</option>
								{workoutOptions.map(option => (
									<option
										key={option}
										value={option}>{option}</option>
								))}
							</select>
							{errors.type && <strong className="text-primary-red">{errors.type?.message}</strong>}
						</div>
					</Card >
					<br />
					<Card title='Details'>
						<div className='grid grid-cols-2 my-4'>
							<span>
								<label htmlFor="intensity" className='text-white text-lg font-bold'>Intensity</label>
								<select
									{...register('intensity', { required: { value: true, message: 'Required' } })}
									className='ring-4 ring-primary-blue 
										rounded-3xl placeholder:text-slate-600 text-center my-4 py-4 w-11/12 block mx-auto
										shadow-lg shadow-black/70 text-black'
								>
									<option value=""></option>
									{Array.from({length:10}).map((_, value) => (
										<option
											key={value+ 1}
											value={value +1}>{value +1}</option>
									))}
								</select>					
								{errors.intensity && <strong className="text-primary-red">{errors.intensity?.message}</strong>}
							</span>
							<span>
								<label htmlFor="caloriesBurned" className='text-white text-lg font-bold'>Calories Burned</label>
								<input name='caloriesBurned'
									className={`ring-4 ring-primary-blue 
										rounded-3xl placeholder:text-slate-600 text-center my-4 py-4 w-11/12 block mx-auto
										shadow-lg shadow-black/70 text-black`}
									{...register('caloriesBurned', {
										pattern: {
											value: /^[0-9]+$/,
											message: 'Enter a valid integer value',
										},
										required: {
											message: 'Required',
											value: true
										},
									})}
								/>
								{errors.caloriesBurned && <strong className="text-primary-red">{errors.caloriesBurned?.message}</strong>}
							</span>
						</div>
						<div className='grid grid-cols-2 my-4'>
							<span>
								<label htmlFor="distance" className='text-white text-lg font-bold'>Distance</label>
								<input name='distance'
									className={`ring-4 ring-primary-blue 
										rounded-3xl placeholder:text-slate-600 text-center my-4 py-4 w-11/12 block mx-auto
										shadow-lg shadow-black/70 text-black`}
									{...register('distance', {
										pattern: {
											value: /^(0|[1-9]\d*)(\.\d+)?$/,
											message: 'Enter a valid decimal number',
										},
										required: {
											message: 'Required',
											value: true
										},
									})}
								/>
								{errors.distance && <strong className="text-primary-red">{errors.distance?.message}</strong>}
							</span>
							<span>
								<label htmlFor="time" className='text-white text-lg font-bold'>Time</label>
								<input name='time'
									className={`ring-4 ring-primary-blue 
										rounded-3xl placeholder:text-slate-600 text-center my-4 py-4 w-11/12 block mx-auto
										shadow-lg shadow-black/70 text-black`}
									{...register('time', {
										pattern: {
											value: /^[0-9]+$/,
											message: 'Enter a valid integer value',
										},
										required: {
											message: 'Required',
											value: true
										},
									})}
								/>
								{errors.time && <strong className="text-primary-red">{errors.time?.message}</strong>}
							</span>
						</div>
						<textarea
							name="cardio-notes"
							rows={6}
							className='ring-4 ring-primary-blue ring-inset rounded-3xl placeholder:text-slate-600 text-center my-6 py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
							placeholder={`${'Any Notes To Add'}`}
							{...register('notes', { required: {value:true, message:'Required'} })}
						>
						</textarea>
						{errors.notes && <strong className="text-primary-red">{errors.notes?.message}</strong>}

					</Card>
					<br />
					<Button
						color='primary-green'
						text='Submit'
						type='submit'
					/>
				</form>
			</main>
		</Layout >
	)
}

export default Cardio