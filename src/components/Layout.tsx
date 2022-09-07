import React from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

import Nav from '@components/Nav'
import Loading from '@components/Loading'
import Fail from '@components/Fail'
import SignIn from '@components/SignIn'
import Success from '@components/Success'
interface LayoutProps {
	title?: string
	children?: React.ReactNode
	pageStatus?: 'failed' | 'idle' | 'success' | 'loading'
	failHandler?: () => void
	successHandler?: () => void

}

const Layout = ({ children, title, pageStatus, failHandler, successHandler }: LayoutProps) => {
	const siteTitle = title || 'Exercise Tracker'
	const { status } = useSession()

	if (pageStatus === 'loading' || status === 'loading') return <Loading />
	else if (status === 'unauthenticated') return <SignIn />
	else if (pageStatus === 'failed') return <Fail clickHandler={failHandler} />
	else if (pageStatus === 'success') return <Success clickHandler={successHandler || null} />
	return (
		<>
			<Head>
				<title>{siteTitle}</title>
				<meta name={siteTitle}></meta>
				{/* Include the favicon when we have one */}
				<link rel='icon' type='image/x-icon' href='/images/favicon.ico' />
			</Head>
			<Nav />
			<section className='block'>
				{children}
			</section>
		</>
	)
}

export default Layout