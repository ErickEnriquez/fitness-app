import React from 'react'
import Menu, { Links } from '@components/Menu'
const Nav = () => {
	return (
		<div className='max-w-full h-12 flex justify-start items-center bg-black mb-4 text-white rounded-md '>
			<div className='flex md:hidden'><Menu /></div>
			<div className='hidden md:flex'>
				<Links />
			</div>
		</div>
	)
}

export default Nav