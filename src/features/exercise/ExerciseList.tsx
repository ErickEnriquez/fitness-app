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
						<li className='text-white bg-cyan-500 my-12 py-4 rounded-full w-7/8 mx-auto hover:cursor-pointer hover:bg-white hover:outline hover:text-cyan-500 hover:outline-cyan-500'>
							<button onClick={() => dispatch(setActiveEntry(item.id))}>{item.name} - {item.sets} sets x {item.reps} reps</button>
						</li>
					</Link>

				)
			})}
		</>
	)

}

export default ExerciseList