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
			className={`my-4 h-12 text-white ${!isDisabled && 'bg-primary-green outline-primary-green rounded-full w-11/12 mx-auto hover:bg-white hover:text-primary-green hover:outline'} `}
			onClick={clickHandler}
		>
			Submit
		</button>
	)
}

export default SubmitBtn