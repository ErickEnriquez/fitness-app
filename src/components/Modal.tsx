import React, { useState } from 'react'
import Link from 'next/link'

// Modal component that darkens the background and includes two buttons
function Modal({cardioId, workoutId}: {cardioId:number, workoutId:number}) {
	// state to track whether the modal is open or closed
	const [isOpen, setIsOpen] = useState(false)

	// toggle the modal open or closed
	const toggle = () => setIsOpen(!isOpen)

	// handle clicks on the "Workouts" button
	const handleWorkoutsClick = () => {
		// close the modal
		toggle()
	}

	// handle clicks on the "Cardio" button
	const handleCardioClick = () => {
		// close the modal
		toggle()
	}

	return (
		<>
			{/* button to open the modal */}
			<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={toggle}>
				Open Modal
			</button>

			{/* modal component with dark background and two buttons */}
			{isOpen && (
				<div className="modal-overlay bg-gray-900">
					<div className="modal-content p-8">
						<Link href={`/history/${workoutId}`}>
							<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleWorkoutsClick}>
								Workouts
							</button>
						</Link>
						<Link href={`/cardio/${cardioId}`}>
							<button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={handleCardioClick}>
								Cardio
							</button>
						</Link>
					</div>
				</div>
			)}
		</>
	)
}

export default Modal
