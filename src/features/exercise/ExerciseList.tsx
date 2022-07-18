/* eslint-disable indent */
import React from 'react'
import Card from '@components/Card'
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
		<Card title={'Exercises'}>
			<ul className='grid grid-cols-2 md:grid-cols-3 mb-4'>
				{exercises.map((item, idx) => {
					return (
						<Link key={idx} href={`/exercise/${item.id}`}>
							<li
								className={
									`w-11/12 text-white my-6 py-4 rounded-3xl mx-auto shadow-lg shadow-black/70 
									hover:cursor-pointer hover:bg-white hover:outline  
								${item.completed
										? 'bg-cyan-700 hover:text-cyan-700 hover:outline-cyan-700 text-white'
										: 'bg-white hover:text-cyan-700 hover:outline-cyan-700 text-cyan-700'
									}  `
								}
								onClick={() => { dispatch(setActiveEntry(item.id)) }}
							>
								<span >
									<strong className='text-l'>{item.name}</strong>
									<br /> {item.sets} sets x {item.reps} reps
								</span>
							</li>
						</Link>
					)
				})}
			</ul>
		</Card>
	)
}

export default ExerciseList