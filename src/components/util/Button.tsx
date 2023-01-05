import React from 'react'

interface buttonProps {
	clickHandler?: () => void
	color?: string
	text: string
	disabled?: boolean
}

const Button = ({ clickHandler, text, color, disabled }: buttonProps) => {
	return (
		<button
			disabled={disabled || false}
			className={` ${color ? `bg-${color} hover:ring-4 ring-${color} hover:text-${color}`
				: 'bg-primary-purple  hover:text-primary-purple'}
				text-center px-8 rounded-full w-3/4 mx-auto text-white shadow-lg shadow-black/70 
				 hover:bg-white 
				flex items-center justify-center h-10 font-bold`
			}
			onClick={clickHandler}
		>{text}</button>
	)
}

export default Button