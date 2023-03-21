/* eslint-disable indent */
import React, { useMemo } from 'react'
import Card from '@components/Card'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import Link from 'next/link'
import {
	//actions
	setActiveEntry,
	//state grabbers
	selectEntries,
}
	from '@features/exercise/ExerciseSlice'


const ExerciseList = () => {

	const dispatch = useAppDispatch()
	const exercises = useAppSelector(selectEntries)
	const sortedExercises = useMemo(() => {
		const temp = [...exercises]
		return temp.sort((a, b) => Number(a.order) - Number(b.order))
	},[exercises])
	return (
		<Card title={'Exercises'}>
			<ul className='grid grid-cols-1 md:grid-cols-3 mb-4'>
				{sortedExercises.map((item, idx) => {
					return (
						<Link key={idx} href={`/exercise/${item.id}`}>
							<li
								className={
									`w-11/12 text-white my-4 py-4 rounded-3xl mx-auto shadow-lg shadow-black/70 
									hover:cursor-pointer hover:bg-white hover:ring-4  
								${item.completed
										? 'bg-primary-blue hover:text-primary-blue hover:ring-4 text-white'
										: 'bg-white hover:text-primary-blue hover:ring-primary-blue text-primary-blue'
									}  `
								}
								onClick={() => { dispatch(setActiveEntry(item.id)) }}
							>
								<strong className='text-l w-11/12 mx-auto'>{`${item.order && `${item.order} : `}`} {item.name}</strong>
								<br /> {item.sets} sets x {item.reps} reps
							</li>
						</Link>
					)
				})}
			</ul>
		</Card>
	)
}

export default ExerciseList