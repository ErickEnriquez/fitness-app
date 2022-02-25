import React from 'react'
import Link from 'next/link'
import Layout from '@features/layout/Layout'
import ExerciseList from '@features/exercise/ExerciseList'
const ExerciseTemplate = () => {
	return (
		<Layout>
			<main className='text-center mt-4'>
				<div className='grid grid-cols-4'>
					<Link href='/workout'><a className='text-white bg-cyan-500 rounded-full w-11/12 mx-auto hover:bg-white hover:text-cyan-500 hover:outline outline-cyan-500'>Back</a></Link>
					<h1 className='text-white col-span-2 mx-auto underline'>Exercises to Complete</h1>

				</div>
				<ul>
					<ExerciseList />
				</ul>
			</main>
		</Layout>
	)
}

export default ExerciseTemplate