import React from 'react'

interface SubmitProps {
	clickHandler: () => void
	isDisabled?: boolean
}

const SubmitBtn = ({ clickHandler, isDisabled }: SubmitProps) => {
	return (
		<button
			disabled={isDisabled}
			type="submit"
			className={`my-4 h-12 text-white ${isDisabled && 'bg-green-600 outline-green-600 rounded-full w-11/12 mx-auto hover:bg-white hover:text-green-600 hover:outline'} `}
			onClick={clickHandler}
		>
			Submit
		</button>
	)
}

export default SubmitBtn