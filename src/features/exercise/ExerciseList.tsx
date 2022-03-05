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
		<>
			{exercises.map((item, idx) => {
				return (
					<Link key={idx} href={`/exercise/${item.id}`}>
						<li
							className={
								`text-white my-12 py-4 rounded-full w-7/8 mx-auto hover:cursor-pointer hover:bg-white hover:outline 
								${item.completed
									? 'bg-purple-600  hover:text-purple-600 hover:outline-purple-600'
									: 'bg-cyan-500  hover:text-cyan-500 hover:outline-cyan-500'
								}  `
							}
							onClick={() => { dispatch(setActiveEntry(item.id)) }}
						>
							<span >{item.name} - {item.sets} sets x {item.reps} reps , order: {item.order ? item.order : 'N/A'}</span>
						</li>
					</Link>
				)
			})}
		</>
	)

}

export default ExerciseList