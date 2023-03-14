import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@components/Layout'
import ExerciseList from '@features/exercise/ExerciseList'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import {
	editWorkoutNotes,
	editWorkoutGrade,
	editPreWorkout,
	resetState,
	clearStatus,
	selectStatus,
	selectEntries,
	selectActiveWorkoutName
} from '@features/exercise/ExerciseSlice'
import { createNewWorkout } from '@features/exercise/thunks'
import Notes from '@components/Notes'
import Card from '@components/Card'
import NumberInput from '@components/NumberInput'
import Button from '@components/util/Button'


const ExerciseTemplate = () => {

	const pageStatus = useAppSelector(selectStatus)

	const workoutName = useAppSelector(selectActiveWorkoutName)
	const workoutEntry = useAppSelector(state => state.exercise.workoutEntry)
	const entries = useAppSelector(selectEntries)
	const dispatch = useAppDispatch()

	const router = useRouter()

	return (
		<Layout
			title='Workout-Templates'
			pageStatus={pageStatus}
			successHandler={() => {
				dispatch(resetState())
				router.push('/workout')
			}}
			failHandler={() => dispatch(clearStatus())}
		>
			{workoutEntry &&
				<main className='text-center mt-4'>
					<div className='grid grid-cols-5 mb-6'>
						<Button text='Exit' color='primary-red'
							clickHandler={() => {
								const r = window.confirm('Are you sure you want to cancel this workout?')
								if (!r) return
								dispatch(resetState())
								router.push('/workout')
							}}
						/>
						<h1 className='text-white col-span-3 mx-auto text-3xl capitalize font-bold bg-dark-gray px-8 py-1 rounded-2xl'>
							{workoutName ?? ''}
						</h1>
						<br />
					</div>
					<ExerciseList />
					<br />
					<Card title='Notes'>
						<Notes
							val={workoutEntry.notes}
							changeHandler={e => dispatch(editWorkoutNotes(e.target.value))}
						/>
					</Card>
					<br />
					<Card title={'Grade & Pre Workout'}>
						<div className='grid grid-cols-2 mt-4'>
							<NumberInput
								name='Grade'
								num={workoutEntry.grade}
								changeHandler={e => dispatch(editWorkoutGrade(Number(e.target.value)))}
							/>
							<select
								id="preWorkout"
								placeholder='Pre-workout?'
								className='ring-4 ring-primary-blue ring-inset rounded-3xl placeholder:text-slate-600 text-center my-4 py-3 w-11/12 block mx-auto shadow-lg shadow-black/70'
								onChange={e => dispatch(editPreWorkout(e.target.value === 'true'))}
							>
								<option value="true">Yes</option>
								<option value="false">No</option>
							</select>
						</div>
					</Card>
					<div className='my-6'>
						<Button
							text='Submit'
							color='primary-green'
							clickHandler={() => {
								if (entries.some(e => !e.completed)) {
									const r = window.confirm('You have exercises that are not complete, are you sure you want to submit?')
									if (!r) return
								}
								dispatch(createNewWorkout())
							}}
						/>
					</div>
				</main>
			}
		</Layout >)

}

export default ExerciseTemplate