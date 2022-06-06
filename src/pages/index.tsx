import { NextPage } from 'next'

import Layout from '@features/layout/Layout'
import Link from 'next/link'


const IndexPage: NextPage = () => {
	return (
		<Layout>
			<main className='text-center'>
				<div className='mt-10 flex flex-col'>
					<h1 className='text-white mb-10 text-3xl'>Quick Links</h1>
					<Link href='/workout'>
						<a className={`rounded-full bg-cyan-500 text-white px-8 py-2 mb-6 w-11/12 mx-auto
					 hover:outline hover:outline-cyan-500 hover:text-cyan-500 hover:bg-white`}>
							Workouts
						</a>
					</Link>
					<Link href='/calendar'>
						<a className={`rounded-full bg-cyan-500 text-white px-8 py-2 w-11/12 mx-auto
					 hover:outline hover:outline-cyan-500 hover:text-cyan-500 hover:bg-white`}>
							Calendar
						</a>
					</Link>
				</div>

			</main >
		</Layout>
	)
}

export default IndexPage