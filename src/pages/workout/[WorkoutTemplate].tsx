import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@components/Layout'
import ExerciseList from '@features/exercise/ExerciseList'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import {
	postExerciseEntries,
	editWorkoutNotes,
	editWorkoutGrade,
	editPreWorkout,
	resetState,
	clearStatus,
	selectStatus,
	selectActiveWorkout
} from '@features/exercise/ExerciseSlice'
import Loading from '@components/Loading'
import Success from '@components/Success'
import Fail from '@components/Fail'
import Notes from '@components/Notes'
import Card from '@components/Card'
import NumberInput from '@components/NumberInput'
import Button from '@components/util/Button'
import SignIn from '@components/SignIn'

import { useSession } from 'next-auth/react'

const ExerciseTemplate = () => {

	const { status } = useSession()
	const pageStatus = useAppSelector(selectStatus)
	const workoutID = useAppSelector(selectActiveWorkout)

	const activeWorkout = useAppSelector(state => state.exercise.workouts.find(w => w.id === workoutID))
	const workoutEntry = useAppSelector(state => state.exercise.workoutEntry)
	const dispatch = useAppDispatch()

	const router = useRouter()

	if (pageStatus === 'loading' || status === 'loading') return <Loading />
	else if (status === 'unauthenticated') return <SignIn />
	else if (pageStatus === 'failed') return <Layout><Fail clickHandler={() => dispatch(clearStatus())} /></Layout>
	else if (pageStatus === 'success') return (
		<Layout>
			<Success clickHandler={() => {
				dispatch(resetState())
				router.push('/workout')
			}} />
		</Layout>)
	else {
		return (
			<Layout>
				{workoutEntry &&
					<main className='text-center mt-4'>
						<div className='grid grid-cols-4 mb-6'>
							<a
								onClick={e => {
									e.preventDefault()
									const r = window.confirm('Are you sure you want to cancel this workout?')
									if (!r) return
									dispatch(resetState())
									router.push('/workout')
								}}
								className={`text-white bg-primary-red rounded-full flex items-center justify-center
							w-11/12 mx-auto outline-primary-red shadow-lg shadow-black/70
							hover:bg-white hover:text-primary-red hover:outline`}
							>
								Exit
							</a>
							<h1 className='text-white col-span-2 mx-auto text-3xl capitalize font-bold bg-dark-gray px-8 py-1 rounded-2xl'>
								{activeWorkout && activeWorkout.name}
							</h1>
							<br />
						</div>
						<ExerciseList />
						<br />
						<Card>
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
									className='outline my-4 outline-primary-blue outline-4 rounded-3xl placeholder:text-slate-600 text-center py-3 w-11/12 block mx-auto shadow-lg shadow-black/70'
									onChange={e => dispatch(editPreWorkout(e.target.value === 'true'))}
								>
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>
							</div>
						</Card>
						<Button
							text='Submit'
							color='primary-green'
							clickHandler={() => dispatch(postExerciseEntries())}
						/>
					</main>
				}
			</Layout >)
	}
}

export default ExerciseTemplate