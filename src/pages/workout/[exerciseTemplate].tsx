import React from 'react'
import Link from 'next/link'
import Layout from '@features/layout/Layout'
import ExerciseList from '@features/exercise/ExerciseList'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import { postExerciseEntries } from '@features/exercise/exerciseSlice'
import Loading from '@features/loading/Loading'
const ExerciseTemplate = () => {
	const status = useAppSelector(state => state.exercise.status)
	const dispatch = useAppDispatch()

	if (status === 'loading') return <Loading />
	return (
		<Layout>
			<main className='text-center mt-4'>
				<div className='grid grid-cols-4'>
					<Link href='/workout'><a className='text-white bg-red-500 rounded-full w-11/12 mx-auto hover:bg-white hover:text-red-500 hover:outline outline-red-500'>Back</a></Link>
					<h1 className='text-white col-span-2 mx-auto underline text-3xl'>Exercises to Complete</h1>
				</div>
				<ExerciseList />
				<div className="w-11/12 mx-auto ">
					<textarea className="w-full rounded mb-10"
						placeholder="Add notes here"
					></textarea>
					<button className='text-white bg-green-500 rounded-full w-11/12 mx-auto hover:bg-white hover:text-green-500 hover:outline outline-green-500 mb-4 h-16'
						onClick={() => dispatch(postExerciseEntries())}>
						Submit
					</button>
				</div>
			</main>
		</Layout>
	)
}

export default ExerciseTemplate