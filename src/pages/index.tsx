/* eslint-disable react/prop-types */
import type { NextPage, GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import { getWorkoutTemplate } from '@server/getWorkoutTemplate'
import { Workout, ExerciseTemplate, ExerciseEntry } from '@prisma/client'
import React, { useState } from 'react'
import { useUpdateEffect } from '@hooks/useUpdateEffect'
import axios from 'axios'
import { useLocalStorage } from '@hooks/useLocalStorage'
interface props {
	workouts: Workout[]
	children: React.ReactNode
}
interface WorkoutTemplate extends ExerciseTemplate {
	name: string
}
interface UserEntry extends WorkoutTemplate {
	weights: number[] | string[],
	intensity?: number,
	notes?: string
}


const IndexPage: NextPage = (props: props) => {
	const [exercises, setExercises] = useState<UserEntry[]>([])
	const [workout, setWorkout] = useState<Workout>()
	const [name, setName] = useLocalStorage('name', '')
	//change the workouts that we get when a new type of workout is selected
	useUpdateEffect(async () => {
		const exercisesList = await axios.get('/api/getExercises', { params: { workoutId: workout.id } })
		const data = exercisesList.data
		setExercises(data.map((item: WorkoutTemplate): UserEntry => {
			return ({
				...item,
				name: item.name,
				weights: Array(item.sets).fill(''),
				intensity: null,
				notes: ''
			})
		}))

	}, [workout])

	const workoutOptions = props.workouts.map((item, idx) => {
		return (
			<option value={item.type} key={idx}>{item.type}</option>
		)
	})

	const changeWeight = (event) => {
		const weight = Number(event.target.value)
		if (isNaN(weight)) { return }
		const movement = Number(event.target.dataset.movement)
		const setNumber = Number(event.target.dataset.setNumber)
		setExercises((prev) => {
			return prev.map((item) => ({
				...item,
				//if movement matches the movementID then add the weight into the list else return list
				weights: movement === item.movementID ?
					//if we are on the correct index set the value else leave it alone
					item.weights.map((w, j: number) => j === setNumber ? weight : w)
					: [...item.weights]
			}))
		})
	}

	const exercisesToDo = exercises.map((item, idx) => {
		return (
			<li key={idx}>
				<strong>{item.name}</strong>
				<h5 className='mb-4'>Sets {item.sets}x{item.reps}</h5>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 content-center">
					{item.weights.map((elem, i: number) => (
						<input
							key={i}
							type="number"
							value={elem}
							data-movement={item.movementID}
							data-set-number={i}
							onChange={changeWeight}
							className='outline mx-2 mb-4 lg:mb-0'
						/>
					))}
				</div>
			</li>
		)
	})

	const saveProgress = async () => {
		return
	}

	return (
		<div className={styles.container}>
			<h1>This is the workout for today</h1>
			<select name="" id=""
				onChange={(e) => setWorkout(props.workouts.find(item => item.type === e.target.value))}
			>
				<option hidden disabled selected>-- select an option --</option>
				{workoutOptions}
			</select>
			<ul className='my-4'>
				{exercisesToDo}
			</ul>
			<button
				className='px-5 rounded-full bg-gray-700 mx-1 text-white  hover:bg-white hover:text-gray-700 hover:outline'
				onClick={() => alert('TODO')}
			>
				Start
			</button>
			<button
				className='px-5 rounded-full bg-blue-700 mx-1 text-white hover:bg-white hover:text-blue-700 hover:outline'
				onClick={saveProgress}
			>
				Save
			</button>
			<button
				className='px-5 rounded-full bg-green-700 mx-1 text-white  hover:bg-white hover:text-green-700 hover:outline'
				onClick={() => alert('TODO')}
			>
				Submit
			</button>
			<input
				type="text"
				placeholder="Enter your name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</div >
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const workouts = await getWorkoutTemplate()
	return { props: { workouts } }
}

export default IndexPage
