import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Loading from '@features/loading/Loading'
import Layout from '@features/layout/Layout'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import { getWorkoutAsync, selectWorkouts, getExerciseAsync } from '@features/exercise/exerciseSlice'

const workout = () => {
	const dispatch = useAppDispatch()
	const workouts = useAppSelector(selectWorkouts)
	const status = useAppSelector(state => state.exercise.status)

	//grab the workout templates from the server on page load
	useEffect(() => {
		dispatch(getWorkoutAsync())
	}, [])

	if (status === 'loading') return <Loading />

	return (
		<Layout>
			<main className='text-center'>
				<h1 className="text-white text-3xl underline">Select a workout</h1>
				<ul>
					{workouts.map((item, idx) => {
						return (
							<Link href={`/workout/${item.id}`} key={idx}>
								<li className={`
								bg-cyan-500 rounded-full my-12 py-4 hover:bg-white hover:outline outline-cyan-500 text-white
								hover:text-cyan-500 hover:cursor-pointer w-11/12 mx-auto`
								}
								onClick={() => dispatch(getExerciseAsync(item.id))}
								>
									<a className="capitalize">{item.type}</a>
								</li>
							</Link>
						)
					})}
				</ul>
			</main>
		</Layout>
	)
}

export default workout