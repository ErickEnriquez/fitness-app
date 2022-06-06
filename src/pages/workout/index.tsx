import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Loading from '@components/Loading'
import Layout from '@features/layout/Layout'
import Card from '@components/Card'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import { getWorkoutAsync, selectWorkouts, getExerciseTemplates, selectStatus } from '@features/exercise/exerciseSlice'

const WorkoutPage: NextPage = () => {
	const dispatch = useAppDispatch()
	const workouts = useAppSelector(selectWorkouts)
	const status = useAppSelector(selectStatus)

	//grab the workout templates from the server on page load
	useEffect(() => {
		dispatch(getWorkoutAsync())
	}, [])


	if (status === 'loading') return <Loading />

	return (
		<Layout>
			<main className='text-center my-4'>
				<Card title='Select a Workout'>
					<ul className='grid grid-cols-2 w-11/12 mx-auto'>
						{workouts.map((item, idx) => {
							return (
								<Link href={`/workout/${item.id}`} key={idx}>
									<li
										className={`
									rounded-3xl my-4 py-4  w-11/12 mx-auto text-white bg-purple-600 outline-purple-600 shadow-lg shadow-black/70 
									hover:bg-white hover:outline hover:text-purple-600 hover:cursor-pointer`
										}
										onClick={() => dispatch(getExerciseTemplates(item.id))}
									>
										<strong className="capitalize underline">{item.type}</strong>
										<p>Last Worked<br /> {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</p>
									</li>
								</Link>
							)
						})}
					</ul>
				</Card>
			</main>
		</Layout>
	)
}

export default WorkoutPage