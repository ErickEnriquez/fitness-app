import React from 'react'
import Link from 'next/link'
const BackBtn = ({ href, clickHandler }: { href: string, clickHandler?: () => void }) => {
	return (
		<Link href={href}>
			<span className="flex items-center">
				<a onClick={clickHandler}
					className={`
									text-center bg-primary-purple px-8 rounded-full w-3/4 mx-auto text-white shadow-lg shadow-black/70 
									hover:outline-primary-purple hover:outline hover:bg-white hover:text-primary-purple
									flex items-center justify-center h-10 font-bold
									`}
				>Back
				</a>
			</span>
		</Link>)
}

export default BackBtn