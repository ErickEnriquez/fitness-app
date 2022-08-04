import React, { useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Loading from '@components/Loading'
import Layout from '@components/Layout'
import Card from '@components/Card'
import SignIn from '@components/SignIn'

import { useSession } from 'next-auth/react'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import { getWorkoutAsync, selectWorkouts, getExerciseTemplates, selectStatus } from '@features/exercise/exerciseSlice'

const WorkoutPage: NextPage = () => {
	const dispatch = useAppDispatch()
	const workouts = useAppSelector(selectWorkouts)
	const pageStatus = useAppSelector(selectStatus)

	const { data, status } = useSession()

	//grab the workout templates from the server on page load
	useEffect(() => {
		if (status === 'authenticated') {
			dispatch(getWorkoutAsync(data?.user?.id))
		}
	}, [status])


	//useMemo is used to avoid sorting this data every time the page is rendered
	const previous = useMemo(() => {
		const previousWorkouts = [...workouts]
		previousWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		return previousWorkouts
	}, [workouts])

	if (pageStatus === 'loading' || status === 'loading') return <Loading />
	else if (status === 'unauthenticated') return <SignIn />
	return (
		<Layout>
			<main className='text-center my-4'>
				<Card title={'Your Workouts'}>
					<ul className='grid grid-cols-2 w-11/12 mx-auto'>
						{workouts.map((item, idx) => {
							return (
								<Link href={`/workout/${item.id}`} key={idx}>
									<li
										className={`
									rounded-3xl my-4 py-8  w-11/12 mx-auto text-white bg-cyan-700 outline-cyan-700 shadow-lg shadow-black/70 
									hover:bg-white hover:outline hover:text-cyan-900 hover:cursor-pointer`
										}
										onClick={() => dispatch(getExerciseTemplates(item.id))}
									>
										<strong className="capitalize underline">{item.type}</strong>
									</li>
								</Link>
							)
						})}
					</ul>
				</Card>
				<br />
				<Card title={'Previous Workouts'}>
					<ul>
						{previous.map((workout, idx) => (
							<li key={idx} className='text-white capitalize my-4'>
								<strong className='underline'>{workout.type} - {new Date(workout.date).toLocaleDateString()} </strong>
							</li>
						))}
					</ul>
				</Card>
			</main>
		</Layout>
	)
}

export default WorkoutPage