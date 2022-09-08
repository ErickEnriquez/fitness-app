import React from 'react'
import Link from 'next/link'
import Button from './util/Button'

const BackBtn = ({ href, clickHandler }: { href: string, clickHandler?: () => void }) => {
	return (
		<Link href={href}>
			<Button color='primary-blue' text='Back' clickHandler={clickHandler} />
		</Link>)
}

export default BackBtn