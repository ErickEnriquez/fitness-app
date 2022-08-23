import { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import Layout from '@components/Layout'
import Link from 'next/link'
import Loading from '@components/Loading'
import SignIn from '@components/SignIn'


const IndexPage: NextPage = () => {
	const { data, status } = useSession()
	if (status === 'loading') {
		return <Loading />
	}
	else if (status === 'unauthenticated') {
		return <SignIn />
	}
	else {
		return (
			<Layout>
				<main className='text-center'>
					<div className='mt-10 flex flex-col'>
						<h1 className='text-white mb-10 text-3xl'>{`Welcome ${data.user.name.split(' ')[0]}`}</h1>
						<h2 className='text-white mb-10 text-2xl'>Quick Links</h2>
						<Link href='/workout'>
							<a className={`rounded-full bg-cyan-500 text-white px-8 py-2 mb-6 w-11/12 mx-auto
					 hover:outline hover:outline-cyan-500 hover:text-cyan-500 hover:bg-white`}>
								My workouts
							</a>
						</Link>
						<Link href='/calendar'>
							<a className={`rounded-full bg-cyan-500 text-white px-8 py-2 mb-6 w-11/12 mx-auto
					 hover:outline hover:outline-cyan-500 hover:text-cyan-500 hover:bg-white`}>
								Workout calendar
							</a>
						</Link>
						<Link href='/cardio'>
							<a className={`rounded-full bg-cyan-500 text-white px-8 py-2 mb-6 w-11/12 mx-auto
					 hover:outline hover:outline-cyan-500 hover:text-cyan-500 hover:bg-white`}>
								Cardio sessions
							</a>
						</Link>
						<Link href='/'>
							<a className={`rounded-full bg-cyan-500 text-white px-8 py-2 mb-6 w-11/12 mx-auto
					 hover:outline hover:outline-cyan-500 hover:text-cyan-500 hover:bg-white`}>
								{'[WIP]'} Manage workouts 
							</a>
						</Link>
					</div>
				</main >
			</Layout>
		)
	}
}

export default IndexPage