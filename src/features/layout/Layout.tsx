import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
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
			<section>
				{children}
			</section>
		</>
	)
}

export default Layout