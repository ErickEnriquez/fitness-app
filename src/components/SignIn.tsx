import React from 'react'
import { signIn } from 'next-auth/react'
import Card from './Card'
import Button from './util/Button'
const SignIn = () => {
	return (
		<main className='flex h-screen md:h-fit md:mt-4 items-center justify-center'>
			<Card>
				<div className='flex justify-center flex-col my-8 md:my-2'>
					<h1 className='text-white font-bold mx-auto text-center my-6 md:my-4 w-11/12'>Unauthorized Access, please sign in</h1>
					<Button color='primary-blue' text='Sign in' clickHandler={() => signIn()} />
				</div>
			</Card>
		</main>
	)
}

export default SignIn