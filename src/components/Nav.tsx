import React from 'react'
import MobileMenu from '@components/MobileMenu'
import NavLinks from '@components/NavLinks'
const Nav = () => {
	return (
		<nav className='max-w-full h-14 flex justify-start items-center bg-cyan-700 mb-4 text-white rounded-md '>
			<div className='flex md:hidden'><MobileMenu /></div>
			<div className='hidden md:flex'>
				<NavLinks />
			</div>
		</nav>
	)
}

export default Nav