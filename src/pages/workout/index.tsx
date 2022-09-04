import React, { useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '@components/Layout'
import Card from '@components/Card'

import { useSession } from 'next-auth/react'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import { getWorkoutAsync, selectWorkouts, getExerciseTemplates, selectStatus } from '@features/exercise/ExerciseSlice'
import { useRouter } from 'next/router'

const WorkoutPage: NextPage = () => {
	const dispatch = useAppDispatch()
	const workouts = useAppSelector(selectWorkouts)
	const pageStatus = useAppSelector(selectStatus)

	const { data, status } = useSession()

	//grab the workout templates from the server on page load
	useEffect(() => {
		if (status === 'authenticated' && data) {
			dispatch(getWorkoutAsync())
		}
	}, [status])

	const router = useRouter()

	//useMemo is used to avoid sorting this data every time the page is rendered
	const previous = useMemo(() => {
		const previousWorkouts = [...workouts]
		previousWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		return previousWorkouts
	}, [workouts])


	return (
		<Layout
			pageStatus={pageStatus}
			failHandler={() => { router.push('/') }}
		>
			<main className='text-center my-4'>
				<Card title={'Your Workouts'}>
					<ul className='grid grid-cols-2 w-11/12 mx-auto'>
						{workouts && workouts.map((item, idx) => {
							return (
								<Link href={`/workout/${item.id}`} key={idx}>
									<li
										className={`
									rounded-3xl my-4 py-8  w-11/12 mx-auto text-white bg-primary-blue outline-primary-blue shadow-lg shadow-black/70 
									hover:bg-white hover:outline hover:text-cyan-900 hover:cursor-pointer`
										}
										onClick={() => dispatch(getExerciseTemplates(item.id))}
									>
										<strong className="capitalize underline">{item.name}</strong>
									</li>
								</Link>
							)
						})}
					</ul>
				</Card>
				<br />
				<Card title={'Previous Workouts'}>
					<ul>
						{workouts && previous.map((workout, idx) => (
							<Link key={idx} href={`/history/${workout.prevWorkoutId}`}>
								<a >
									<li className='text-white capitalize my-4'>
										<strong className='underline'>{workout.name} - {new Date(workout.date).toLocaleDateString()} </strong>
									</li>
								</a>
							</Link>
						))}
					</ul>
				</Card>
			</main>
		</Layout>
	)
}

export default WorkoutPage