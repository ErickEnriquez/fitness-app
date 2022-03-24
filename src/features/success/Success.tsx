import React from 'react'

const Success = () => {
	return (
		<div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert">
			<div className="flex justify-left">
				<div>
					<p className="font-bold">Workout has been successfully uploaded</p>
					<p className="text-sm">You can close this page safely</p>
				</div>
			</div>
		</div>
	)
}

export default Success