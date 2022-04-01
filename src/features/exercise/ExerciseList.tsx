/* eslint-disable indent */
import React from 'react'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import Link from 'next/link'
import {
	//actions
	setActiveEntry,
	//state grabbers
	selectEntries,
}
	from '@features/exercise/exerciseSlice'


const ExerciseList = () => {

	const dispatch = useAppDispatch()
	const exercises = useAppSelector(selectEntries)
	return (
		<div className='bg-slate-700  w-11/12 mx-auto rounded-2xl'>
			<h2 className='text-white text-xl font-bold'>Exercises</h2>
			<ul className='grid grid-cols-2 md:grid-cols-3 mb-4'>
				{exercises.map((item, idx) => {
					return (
						<Link key={idx} href={`/exercise/${item.id}`}>
							<li
								className={
									`w-11/12 text-white my-6 py-4 rounded-3xl mx-auto shadow-lg shadow-black/70 
									hover:cursor-pointer hover:bg-white hover:outline 
								${item.completed
										? 'bg-purple-600  hover:text-purple-600 hover:outline-purple-600'
										: 'bg-cyan-500  hover:text-cyan-500 hover:outline-cyan-500'
									}  `
								}
								onClick={() => { dispatch(setActiveEntry(item.id)) }}
							>
								<span >
									<strong className='text-l'>{item.name}</strong>
									<br /> {item.sets} sets x {item.reps} reps
									<br /> Order: {item.order ? item.order : 'N/A'}
								</span>
							</li>
						</Link>
					)
				})}
			</ul>
		</div>

	)
}

export default ExerciseList