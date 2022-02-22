/* eslint-disable react/prop-types */
import type { NextPage, GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import { getWorkoutTemplate } from '@server/getWorkoutTemplate'
import { Workout, ExerciseTemplate, ExerciseEntry } from '@prisma/client'
import React, { useState } from 'react'
import { useUpdateEffect } from '@hooks/useUpdateEffect'
import axios from 'axios'
import { useLocalStorage } from '@hooks/useLocalStorage'
import Exercise from '@features/exercise/Exercise'
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
	notes?: string,
	order?: number
}


const IndexPage: NextPage = (props: props) => {
	// const [exercises, setExercises] = useLocalStorage<UserEntry[]>('exercises', [])
	// const [workout, setWorkout] = useState<Workout>()
	// //change the workouts that we get when a new type of workout is selected
	// useUpdateEffect(async () => {
	// 	const exercisesList = await axios.get('/api/getExercises', { params: { workoutId: workout.id } })
	// 	const data = exercisesList.data
	// 	setExercises(data.map((item: WorkoutTemplate): UserEntry => {
	// 		return ({
	// 			...item,
	// 			name: item.name,
	// 			weights: Array(item.sets).fill(''),
	// 			intensity: null,
	// 			notes: ''
	// 		})
	// 	}))

	// }, [workout])

	// const workoutOptions = props.workouts.map((item, idx) => {
	// 	return (
	// 		<option value={item.type} key={idx}>{item.type}</option>
	// 	)
	// })

	// const changeWeight = (event) => {
	// 	const weight = Number(event.target.value)
	// 	if (isNaN(weight)) { return }
	// 	const movement = Number(event.target.dataset.movement)
	// 	const setNumber = Number(event.target.dataset.setNumber)
	// 	setExercises((prev) => {
	// 		return prev.map((item) => ({
	// 			...item,
	// 			//if movement matches the movementID then add the weight into the list else return list
	// 			weights: movement === item.movementID ?
	// 				//if we are on the correct index set the value else leave it alone
	// 				item.weights.map((w, j: number) => j === setNumber ? weight : w)
	// 				: [...item.weights]
	// 		}))
	// 	})
	// }

	// const editNotes = (event) => {
	// 	const movement = Number(event.target.dataset.movement)
	// 	setExercises((prev) => {
	// 		return prev.map((item) => ({
	// 			...item,
	// 			//if we are correct movement to change then change the notes
	// 			notes: movement === item.movementID ? event.target.value : item.notes
	// 		}))
	// 	})
	// }

	// const editIntensity = (event) => {
	// 	const currentIntensity = Number(event.target.value)
	// 	if (isNaN(currentIntensity)) { return }

	// 	const movement = Number(event.target.dataset.movement)
	// 	setExercises((prev) => {
	// 		return prev.map((item) => ({
	// 			...item,
	// 			//if we are correct movement to change then change the notes
	// 			intensity: movement === item.movementID ? currentIntensity : item.intensity
	// 		}))
	// 	})
	// }

	// const editOrder = (event) => {
	// 	const order = Number(event.target.value)
	// 	if (isNaN(order)) { return }

	// 	const movement = Number(event.target.dataset.movement)
	// 	setExercises((prev) => {
	// 		return prev.map((item) => ({
	// 			...item,
	// 			//if we are correct movement to change then change the notes
	// 			order: movement === item.movementID ? order : item.order
	// 		}))
	// 	})
	// }

	// const exercisesToDo = exercises.map((item, idx) => {
	// 	return (
	// 		<li key={idx}
	// 			className='w-11/12 mx-auto'
	// 		>
	// 			<strong>{item.name}</strong>
	// 			<h5 className='mb-4'>Sets {item.sets}x{item.reps}</h5>
	// 			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 content-center">
	// 				{item.weights.map((elem, i: number) => (
	// 					<input
	// 						key={i}
	// 						type="number"
	// 						value={elem}
	// 						data-movement={item.movementID}
	// 						data-set-number={i}
	// 						onChange={changeWeight}
	// 						placeholder={`Weight for set ${i + 1}`}
	// 						className='outline outline-orange-700 mx-2 mb-4 lg:mb-0'
	// 					/>
	// 				))}
	// 			</div>
	// 			<div className="mt-4 grid gap-7 grid-cols-1 md:grid-cols-3 content-center">
	// 				<input
	// 					type="text"
	// 					placeholder='Notes'
	// 					className='outline my-1 outline-yellow-400'
	// 					data-movement={item.movementID}
	// 					value={item.notes}
	// 					onChange={editNotes}
	// 				/>
	// 				<input
	// 					type="number"
	// 					placeholder='Intensity 0-10'
	// 					className='outline my-1 outline-purple-600'
	// 					data-movement={item.movementID}
	// 					value={item.intensity}
	// 					min={0}
	// 					max={10}
	// 					onChange={editIntensity}
	// 				/>
	// 				<input
	// 					type="number"
	// 					placeholder='Order'
	// 					className='outline my-1 outline-blue-700'
	// 					data-movement={item.movementID}
	// 					value={item.order}
	// 					onChange={editOrder}
	// 				/>
	// 			</div>
	// 		</li>
	// 	)
	// })

	// const submitWorkout = async () => {
	// 	// setExercises([])
	// 	alert('TODO: submit to server')
	// 	setExercises([])
	// 	return
	// }

	return (
		<Exercise />
		// <div className={styles.container}>
		// 	<h1>This is the workout for today</h1>
		// 	<select name="" id=""
		// 		onChange={(e) => setWorkout(props.workouts.find(item => item.type === e.target.value))}
		// 	>
		// 		<option hidden disabled selected>-- select an option --</option>
		// 		{workoutOptions}
		// 	</select>
		// 	<ul className='my-4'>
		// 		{exercisesToDo}
		// 	</ul>
		// 	<button
		// 		className='px-5 rounded-full bg-green-700 mx-1 text-white  hover:bg-white hover:text-green-700 hover:outline'
		// 		onClick={submitWorkout}
		// 	>
		// 		Submit
		// 	</button>
		// 	<button
		// 		className='px-5 rounded-full bg-red-700 mx-1 text-white  hover:bg-white hover:text-red-700 hover:outline'
		// 		onClick={() => {
		// 			const a = confirm('Are you sure you want to clear the workout?')
		// 			if(a) {
		// 				setExercises([])
		// 			}
		// 		}}
		// 	>
		// 		Clear
		// 	</button>
		// </div >
	)
}

// export const getStaticProps: GetStaticProps = async () => {
// 	// const workouts = await getWorkoutTemplate()
// 	// return { props: { workouts } }
// }

export default IndexPage