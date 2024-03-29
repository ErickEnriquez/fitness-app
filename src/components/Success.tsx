import React from 'react'

interface props {
	clickHandler?: () => void
}

const Success = ({ clickHandler }: props) => {
	return (
		<div role="alert" className="mx-auto w-11/12 pt-8">
			<div className="bg-primary-green border-accent-green text-white font-bold rounded-t px-4 py-2 flex justify-between">
				<h2 className="mx-auto text-xl">Success</h2>
				<button
					onClick={clickHandler}
					className='bg-primary-blue px-5 rounded-full shadow-lg shadow-black/50'>Exit
				</button>
			</div>
			<div className="flex justify-left bg-secondary-green py-4">
				<div className='mx-auto'>
					<p className="font-bold">Data has been successfully uploaded</p>
					<p className="text-sm">You can close this tab safely</p>
				</div>
			</div>
		</div>
	)
}

export default Success