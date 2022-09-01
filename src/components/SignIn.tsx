import React from 'react'
import { signIn } from 'next-auth/react'
const SignIn = () => {
	return (
		<div className='flex justify-center flex-col'>
			<h1 className='text-white font-bold mx-auto text-center my-4 w-11/12'>Unauthorized Access, please sign in</h1>
			<button className='bg-primary-blue w-11/12 md:w-1/4 mx-auto py-2 rounded-xl text-white' onClick={() => signIn()}>Sign In</button>
		</div>
	)
}

export default SignIn