import React from 'react'
import Head from 'next/head'
import Iamge from 'next/image'

interface LayoutProps {
	title?: string
	children?: React.ReactNode

}

const Layout = ({ children, title }: LayoutProps) => {
	const siteTitle = title || 'Exercise Tracker'
	return (
		<>
			<Head>
				<title>{siteTitle}</title>
				<meta name={siteTitle}></meta>
				{/* Include the favicon when we have one */}
				{/* <link rel="icon" href="" /> */}
			</Head>
			<body className='bg-slate-800 absolute inset-0'>
				{children}
			</body>
		</>
	)
}

export default Layout