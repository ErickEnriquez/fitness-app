import React from 'react'
import Link from 'next/link'
import Layout from '@features/layout/Layout'
import ExerciseList from '@features/exercise/ExerciseList'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import { postExerciseEntries, editWorkoutNotes, editWorkoutGrade, editPreWorkout } from '@features/exercise/exerciseSlice'
import Loading from '@features/loading/Loading'

const ExerciseTemplate = () => {
	const status = useAppSelector(state => state.exercise.status)
	const workoutID = useAppSelector(state => state.exercise.activeWorkout)

	const activeWorkout = useAppSelector(state => state.exercise.workouts.find(w => w.id === workoutID))
	const workoutEntry = useAppSelector(state => state.exercise.workoutEntry)
	const dispatch = useAppDispatch()

	if (status === 'loading') return <Loading />
	return (
		<Layout>
			{workoutEntry &&
				<main className='text-center mt-4'>
					<div className='grid grid-cols-4 mb-6'>
						<Link href='/workout'>
							<a className={`text-white bg-red-500 rounded-full flex items-center justify-center
						w-11/12 mx-auto outline-red-500 shadow-lg shadow-black/70
						hover:bg-white hover:text-red-500 hover:outline`}
							>
								Back
							</a>
						</Link>
						<h1 className='text-white col-span-2 mx-auto underline text-3xl capitalize'>{activeWorkout && activeWorkout.type}</h1>
					</div>
					<ExerciseList />
					<div className="w-11/12 mx-auto bg-slate-700 rounded-3xl mb-6">
						<h2 className='text-white text-xl'>Notes</h2>
						<textarea className="w-11/12 rounded my-4 h-24 outline outline-yellow-500 outline-4 shadow-lg shadow-black/70"
							onChange={(e) => dispatch(editWorkoutNotes(e.target.value))}
							value={workoutEntry.notes}
							placeholder="Include any notes about the workout in general"
						></textarea>
					</div>
					<div className="w-11/12 mx-auto bg-slate-700 rounded-3xl py-4">
						<h2 className='text-white text-xl'>Grade & Pre-workout?</h2>
						<div className='grid grid-cols-2 mt-4'>
							<input
								type="Number"
								placeholder='Grade 0 - 10'
								value={workoutEntry.grade}
								onChange={(e) => dispatch(editWorkoutGrade(Number(e.target.value)))}
								className='outline my-1 outline-cyan-300 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-3 w-11/12 block mx-auto  shadow-lg shadow-black/70'
							/>
							<select
								id="preWorkout"
								placeholder='Pre-workout?'
								className='outline my-1 outline-fuchsia-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-3 w-11/12 block mx-auto  shadow-lg shadow-black/70'
								onChange={(e) => dispatch(editPreWorkout(e.target.value === 'Yes'))}
							>
								<option value="true">Yes</option>
								<option value="false">No</option>
							</select>
						</div>
					</div>
					<button className='text-white bg-green-500 rounded-full w-11/12 mx-auto hover:bg-white hover:text-green-500 hover:outline outline-green-500 my-4 h-16'
						onClick={() => dispatch(postExerciseEntries())}>
						Submit
					</button>
				</main>
			}
		</Layout >
	)
}

export default ExerciseTemplate