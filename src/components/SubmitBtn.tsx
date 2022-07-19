import React from 'react'

interface SubmitProps {
	clickHandler: () => void
}

const SubmitBtn = ({ clickHandler }: SubmitProps) => {
	return (
		<button
			type="submit"
			className='text-white bg-green-600 rounded-full w-11/12 mx-auto hover:bg-white hover:text-green-600 hover:outline outline-green-600 my-4 h-12'
			onClick={clickHandler}
		>
			Submit
		</button>
	)
}

export default SubmitBtn