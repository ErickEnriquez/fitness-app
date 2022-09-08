import { NextPage } from 'next'

import Layout from '@components/Layout'
import Link from 'next/link'
import Card from '@components/Card'
import Button from '@components/util/Button'

const IndexPage: NextPage = () => {
	return (
		<Layout >
			<main className='mt-10'>
				<Card>
					<h1 className='text-white mb-10 text-3xl'>{'Welcome'}</h1>
					<h2 className='text-white mb-10 text-2xl'>Quick Links</h2>
					<div className='grid grid-col gap-8 mb-4'>
						<Link href='/workout'>
							<a> <Button text="My Workouts" color='primary-blue' /> </a>
						</Link>
						<Link href='/calendar'>
							<a> <Button text="Workout Calendar" color='primary-blue' /> </a>
						</Link>
						<Link href='/cardio'>
							<a> <Button text="Cardio Sessions" color='primary-blue' /> </a>
						</Link>
						<Link href='/'>
							<a ><Button text="WIP manage workouts" color='primary-blue' /></a>
						</Link>
					</div>
				</Card>
			</main>
		</Layout>
	)
}


export default IndexPage