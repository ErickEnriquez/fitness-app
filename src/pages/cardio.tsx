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
							className='outline my-6 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
						>
							<option value="">Select an option</option>
							{workoutOptions.map(option => (
								<option key={option} value={option}>{option}</option>
							))}
						</select>
						<input type="text" placeholder='calories burned'
							className='outline my-6 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
						/>
						<input type="text" placeholder="distance"
							className='outline my-6 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'

						/>
						<input type="text" placeholder="time"
							className='outline my-6 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'

						/>
					</div>
					<textarea name="" id="" rows={10} 
						className='outline my-6 outline-cyan-500 outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
						placeholder='Any Notes to add'>
					</textarea>
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