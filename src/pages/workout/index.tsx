import React, { useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import {Layout, Card} from '@components/index'

import { useSession } from 'next-auth/react'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import {  selectWorkouts, selectStatus } from '@features/exercise/ExerciseSlice'
import { getWorkoutOptionsAsync, getExerciseTemplates } from '@features/exercise/thunks'
import { useRouter } from 'next/router'
import { parseISO } from 'date-fns'

const WorkoutPage: NextPage = () => {
	const dispatch = useAppDispatch()
	const workoutOptions = useAppSelector(selectWorkouts)
	const pageStatus = useAppSelector(selectStatus)
	const router = useRouter()

	const { data, status } = useSession()
	//grab the workout templates from the server on page load
	useEffect(() => {
		if (status === 'authenticated' && data) {
			dispatch(getWorkoutOptionsAsync())
		}
	}, [status])


	//useMemo is used to avoid sorting this data every time the page is rendered
	const previous = useMemo(() => {
		if (!workoutOptions) return
		const previousWorkouts = [...workoutOptions]
		previousWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		return previousWorkouts
	}, [workoutOptions])

	const previousWorkouts = previous && previous.map((workout, i) =>
		<Link key={i} href={`/history/${workout.id}`}>
			<div className='w-11/12 mx-auto grid grid-cols-3 text-white my-2'>
				<strong>{workout.name}</strong>
				<strong>{parseISO(workout.date).toLocaleDateString()}</strong>
				<strong>{workout.grade ?? 'N/A'}</strong>
			</div>
		</Link >
	)
	const workoutOptionList =  workoutOptions && workoutOptions.map((item, idx) =>  (
		<Link href={`/workout/${item.workoutTemplateId}`} key={idx}>
			<li
				className={`
					rounded-3xl my-4 py-8  w-11/12 mx-auto text-white bg-primary-blue  shadow-lg shadow-black/70 
					hover:bg-white hover:ring-4 hover:ring-primary-blue hover:text-primary-blue hover:cursor-pointer`
				}
				onClick={() => dispatch(getExerciseTemplates({prevWorkoutId:item.id, templateId:item.workoutTemplateId}))}
			>
				<strong className="capitalize underline">{item.name}</strong>
			</li>
		</Link>
	))
	
	return (
		<Layout
			pageStatus={pageStatus}
			failHandler={() => { router.push('/') }}
		>
			<main className='text-center my-4'>
				<Card title={'Your Workouts'}>
					<ul className='grid grid-cols-2 w-11/12 mx-auto'>
						{workoutOptionList}
					</ul>
				</Card>
				<br />
				<Card title={'Previous Workouts'}>
					<div className='w-11/12 mx-auto my-4 bg-primary-blue grid grid-cols-3 rounded-xl'>
						<strong className='text-white'>Workout</strong>
						<strong className='text-white'>Date</strong>
						<strong className='text-white'>Grade</strong>
					</div>
					{previousWorkouts}
				</Card>
			</main>
		</Layout>
	)
}

export default WorkoutPage