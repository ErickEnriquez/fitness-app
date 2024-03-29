import React from 'react'
import MobileMenu from '@components/MobileMenu'
import NavLinks from '@components/NavLinks'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
const Nav = () => {
	const { data, status } = useSession()
	return (
		<nav className='max-w-full h-14 flex justify-start items-center bg-primary-blue mb-4 text-white rounded-md '>
			<div className='flex md:hidden'><MobileMenu /></div>
			<div className='hidden md:flex'>
				<NavLinks />
				{status === 'authenticated' && <Image layout={'intrinsic'} width={50} height={50} priority={true} src={data.user.image} />}
			</div>
		</nav>
	)
}

export default Nav