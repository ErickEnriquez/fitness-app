import React from 'react'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import {
	selectCardioId, selectWorkoutId,
	selectIsModalVisible, toggleModal
} from '@features/calendar/CalendarSlice'

// Modal component that darkens the background and includes two buttons
function Modal() {
	const isOpen = useAppSelector(selectIsModalVisible)
	const cardioId = useAppSelector(selectCardioId)
	const workoutId = useAppSelector(selectWorkoutId)
	const dispatch = useAppDispatch()
	const toggle = () => dispatch(
		toggleModal()
	)
	return (
		<>
			{/* modal component with dark background and two buttons */}
			{isOpen && (
				<div className="modal-overlay bg-gray-900">
					<div className="modal-content p-8">
						{/* show if we have a workout to display */}
						{
							workoutId && (
								<Link href={`/history/${workoutId}`}>
									<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={toggle}>
										Workouts
									</button>
								</Link>
							)
						}
						{/* only show button if we have a previous cardio session to display */}
						{
							cardioId && (
								<Link href={`/cardio/${cardioId}`}>
									<button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={toggle}>
										Cardio
									</button>
								</Link>
							)
						}
					</div>
				</div>
			)}
		</>
	)
}

export default Modal
