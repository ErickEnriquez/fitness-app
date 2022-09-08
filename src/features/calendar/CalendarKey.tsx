import React from 'react'

const CalendarKey = () => {
	return (
		<section className='mt-4'>
			<h3 className='text-white font-bold text-2xl w-11/12 mx-auto'>Tap a day for more info</h3>
			<div className='grid grid-cols-2 mt-6'>
				<span className='h-4 bg-primary-green w-1/2 mx-auto'></span>
				<span className='text-white w-11/12 mx-auto font-bold'>Completed Workout</span>
			</div>
			<div className='grid grid-cols-2 mt-6'>
				<span className='h-4 bg-primary-purple w-1/2 mx-auto'></span>
				<span className='text-white w-11/12 mx-auto font-bold'>Completed Cardio</span>
			</div>
		</section>
	)
}

export default CalendarKey