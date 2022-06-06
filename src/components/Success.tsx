import React from 'react'

interface props {
	clickHandler?: () => void
}

const Success = ({ clickHandler }: props) => {
	return (
		<div role="alert">
			<div className="bg-green-100 border-green-500 text-white font-bold rounded-t px-4 py-2 flex justify-between">
				<span>Error</span>
				<button
					onClick={clickHandler}
					className='bg-cyan-500 px-5 rounded-full shadow-lg shadow-black/50'>Exit
				</button>
			</div>
			<div className="flex justify-left">
				<div>
					<p className="font-bold">Workout has been successfully uploaded</p>
					<p className="text-sm">You can close this tab safely</p>
				</div>
			</div>
		</div>
	)
}

export default Success