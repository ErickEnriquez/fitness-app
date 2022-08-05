import React from 'react'

interface buttonProps {
	clickHandler: () => void
	text: string
}

const Button = ({ clickHandler, text }: buttonProps) => {
	return (
		<button
			className='bg-cyan-700 hover:bg-white hover:text-cyan-700 text-white font-bold py-2 px-4 rounded-full w-11/12 mx-auto'
			onClick={clickHandler}
		>{text}</button>
	)
}

export default Button