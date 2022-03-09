import React from 'react'
import Link from 'next/link'
import Layout from '@features/layout/Layout'
import ExerciseList from '@features/exercise/ExerciseList'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import { postExerciseEntries } from '@features/exercise/exerciseSlice'
import Loading from '@features/loading/Loading'

const ExerciseTemplate = () => {
	const status = useAppSelector(state => state.exercise.status)
	const workoutID = useAppSelector(state => state.exercise.activeWorkout)

	const activeWorkout = useAppSelector(state => state.exercise.workouts.find(w => w.id === workoutID))
	const dispatch = useAppDispatch()

	if (status === 'loading') return <Loading />
	return (
		<Layout>
			<main className='text-center mt-4'>
				<div className='grid grid-cols-4 mb-4'>
					<Link href='/workout'>
						<a className='text-white bg-red-500 rounded-full w-11/12 mx-auto hover:bg-white hover:text-red-500 hover:outline outline-red-500 shadow-lg shadow-black/70'
						>
							Back
						</a>
					</Link>
					<h1 className='text-white col-span-2 mx-auto underline text-3xl capitalize'>{activeWorkout && activeWorkout.type}</h1>
				</div>
				<ExerciseList />
				<div className="w-11/12 mx-auto bg-slate-700 rounded-3xl">
					<h2 className='text-white text-xl'>Notes</h2>
					<textarea className="w-11/12 rounded my-4 h-24 outline outline-yellow-500 outline-4 shadow-lg shadow-black/70"
						placeholder="Include any notes about the workout in general"
					></textarea>
				</div>
				<button className='text-white bg-green-500 rounded-full w-11/12 mx-auto hover:bg-white hover:text-green-500 hover:outline outline-green-500 my-4 h-16'
					onClick={() => dispatch(postExerciseEntries())}>
					Submit
				</button>
			</main>
		</Layout>
	)
}

export default ExerciseTemplate