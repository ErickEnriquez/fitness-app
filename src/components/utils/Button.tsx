import React from 'react'

interface props {
	clickHandler: () => void
	text: string
	disabledBtn?: boolean
}

const Button = ({ clickHandler, text, disabledBtn }: props) => {
	return (
		<button
			disabled={disabledBtn || false}
			className='bg-cyan-700 px-4 py-2 rounded-xl hover:bg-white hover:text-cyan-700 hover:outline hover:outline-cyan-700'
			onClick={clickHandler}
		>
			{text}
		</button>
	)
}

export default Button