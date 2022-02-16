/* eslint-disable react/prop-types */
import type { NextPage, GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import { getWorkoutTemplate } from '@server/getWorkoutTemplate'
import { Workout, ExerciseTemplate } from '@prisma/client'
import React, { useState } from 'react'
import { useUpdateEffect } from '@hooks/useUpdateEffect'
import axios from 'axios'
interface props {
	workouts: Workout[]
	children: React.ReactNode
}

interface WorkoutTemplate extends ExerciseTemplate {
	name: string
}

const IndexPage: NextPage = (props: props) => {
	const [exercises, setExercises] = useState<WorkoutTemplate[]>([])
	const [workout, setWorkout] = useState<Workout>()


	useUpdateEffect(async () => {
		const exercisesList = await axios.get('/api/getExercises', { params: { workoutId: workout.id } })
		console.log(exercisesList.data)
		setExercises([...exercisesList.data])
	}, [workout])

	const workoutOptions = props.workouts.map((item, idx) => {
		return (
			<option value={item.type} key={idx}>{item.type}</option>
		)
	})

	const exercisesToDo = exercises.map((item, idx) => {
		return (
			<li key={idx}>
				<strong>{item.name}</strong>
				<h5 className='mb-4'>Sets {item.sets}x{item.reps}</h5>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
					<input type="number" className='outline mx-2 mb-4 lg:mb-0' />
					<input type="number" className='outline  mx-2 mx-2 mb-4 lg:mb-0' />
					<input type="number" className='outline  mx-2 mx-2 mb-4 lg:mb-0' />
					<input type="number" className='outline  mx-2 mx-2 mb-4 lg:mb-0' />
					<input type="number" className='outline  mx-2 mx-2 mb-4 lg:mb-0' />
				</div>
			</li>
		)
	})

	return (
		<div className={styles.container}>
			<h1>This is the workout for today</h1>
			<ul className='my-4'>
				{exercisesToDo}
			</ul>

			<select name="" id=""
				onChange={(e) => setWorkout(props.workouts.find(item => item.type === e.target.value))}
			>
				{workoutOptions}
			</select>
			<button className='px-5 rounded-full bg-blue-700 mx-1 text-white hover:bg-white hover:text-blue-700 hover:outline'>Save</button>
			<button className='px-5 rounded-full bg-green-700 mx-1 text-white  hover:bg-white hover:text-green-700 hover:outline'>Submit</button>
		</div >
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const workouts = await getWorkoutTemplate()
	return { props: { workouts } }
}

export default IndexPage
