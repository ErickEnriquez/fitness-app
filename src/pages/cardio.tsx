import React from 'react'
import Layout from '@features/layout/Layout'
import Card from '@components/Card'

import { CardioType } from '@prisma/client'

const workoutOptions = [CardioType.bike, CardioType.run, CardioType.climbing, CardioType.elliptical, CardioType.hike, CardioType.other, CardioType.rowing, CardioType.sport, CardioType.stairs, CardioType.swim]

const Cardio = (): JSX.Element => {
	return (
		<Layout>
			<main className="text-center pt-4">
				<Card title="Enter Cardio Details">
					<div className='grid grid-cols-2 my-2 py-2 w-11/12 mx-auto text-center'>
						<select name="cardioType" id="type"
							className="my-6 py-4 w-11/12 mx-auto rounded-3xl shadow-lg shadow-black/70 outline outline-cyan-500 text-center">
							<option value="">Select an option</option>
							{workoutOptions.map(option => (
								<option key={option} value={option}>{option}</option>
							))}
						</select>
						<input type="text" placeholder='calories burned'
							className="my-6 py-4 w-11/12 mx-auto rounded-3xl shadow-lg shadow-black/70 outline outline-cyan-500 text-center" />
						<input type="text" placeholder="distance"
							className="my-6 py-4 w-11/12 mx-auto rounded-3xl shadow-lg shadow-black/70 outline outline-cyan-500 text-center"
						/>
						<input type="text" placeholder="time"
							className="my-6 py-4 w-11/12 mx-auto rounded-3xl shadow-lg shadow-black/70 outline outline-cyan-500 text-center"
						/>
					</div>
					<textarea name="" id="" rows={10} className="w-11/12 rounded-xl outline outline-cyan-500 text-center" placeholder='Any Notes to add'></textarea>
					<br />
					<button type="submit"
						className='text-white bg-green-500 rounded-full w-11/12 mx-auto hover:bg-white hover:text-green-500 hover:outline outline-green-500 my-4 h-12'
					>
						Submit
					</button>
				</Card>
			</main>
		</Layout>
	)
}

export default Cardio