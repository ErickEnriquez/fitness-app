import React from 'react'
import * as cardioSlice from '@features/cardio/CardioSlice'
import { useAppSelector, useAppDispatch } from '@app/hooks'
import Layout from '@components/Layout'
import Button from '@components/util/Button'
import { useInitialDispatch } from '@hooks/useInitialDispatch'
import Card from '@components/Card'
import { format } from 'date-fns'
import { FaPencilAlt } from 'react-icons/fa'
import Notes from '@components/Notes'
import NumberInput from '@components/NumberInput'

const CardioHistoryPage = () => {

	const dispatch = useAppDispatch()
	const cardioState = useAppSelector(cardioSlice.selectCardioState)
	const pageStatus = useAppSelector(cardioSlice.selectStatus)

	useInitialDispatch('previousCardio', (cardioId) => dispatch(cardioSlice.getPreviousCardioInfo(Number(cardioId))))

	return (
		<Layout
			pageStatus={pageStatus}
			successHandler={() => { dispatch(cardioSlice.clearStatus()) }}
			failHandler={() => alert('fail')}
		>
			<main>
				<section className='grid grid-cols-5 mb-4 items-center'>
					<Button text='Back' color='primary-blue' />
					<h1 className="text-white col-span-3 mx-auto text-3xl capitalize font-bold bg-dark-gray px-8 py-1 rounded-2xl w-11/12 text-center">Type: <br />{cardioState.cardioType}</h1>
					<Button text='X' color='primary-red' clickHandler={() => dispatch(cardioSlice.toggleEditPreviousCardio())} />
				</section>
				<Card>
					<strong className='text-white'>Completed : {format(new Date(cardioState.timeCreated), 'EEE, LLL dd YYY hh:mm aa')}</strong>
					<div className='my-6 bg-primary-blue w-11/12 mx-auto text-white font-bold rounded-xl py-1 grid grid-cols-5'>
						<h3 className='col-start-3'>Notes</h3>
						<span className='col-start-5'>
							{cardioState.editPreviousCardio ? <Button text='cancel' color={'primary-red'} clickHandler={() => dispatch(cardioSlice.toggleEditPreviousCardio())} /> :
								<FaPencilAlt
									color='#FFF'
									style={{ 'display': 'unset', 'verticalAlign': 'unset' }}
									onClick={() => { dispatch(cardioSlice.toggleEditPreviousCardio()) }}
								/>}

						</span>
					</div>
					{
						cardioState.editPreviousCardio ?
							<Notes val={cardioState.notes} changeHandler={e => dispatch(cardioSlice.editCardioNotes(e.target.value))} /> :
							<p className='bg-light-gray w-11/12 mx-auto text-white font-semibold rounded-xl py-2 '>{cardioState.notes}</p>
					}
					<h3 className='my-6 bg-primary-blue w-11/12 mx-auto text-white font-bold rounded-xl py-1'>Details</h3>
					<div className='bg-light-gray w-11/12 mx-auto font-semibold rounded-xl py-2 grid grid-cols-2 text-white my-4'>
						{cardioState.editPreviousCardio ?
							<>
								<strong className='my-8'>Intensity :</strong>
								<NumberInput num={cardioState.intensity} name={'intensity'} changeHandler={e => dispatch(cardioSlice.editCardioIntensity(Number(e.target.value)))} />
								<strong className='my-8'>Time (Min) :</strong>
								<NumberInput num={cardioState.time} name={'time'} changeHandler={e => dispatch(cardioSlice.editTime(Number(e.target.value)))} />
								<strong className='my-8'>Distance (Mi) :</strong>
								<NumberInput num={cardioState.distance} name={'distance'} changeHandler={e => dispatch(cardioSlice.editDistance(Number(e.target.value)))} />
								<strong className='my-8'>Calories Burned :</strong>
								<NumberInput num={cardioState.caloriesBurned} name={'caloriesBurned'} changeHandler={e => dispatch(cardioSlice.editCaloriesBurned(Number(e.target.value)))} />
							</> :
							<>
								<strong className='my-4'>Intensity :</strong>
								<strong className='my-4 text-white'>{cardioState.intensity}</strong>
								<strong className='my-4'>Time (Min) :</strong>
								<strong className='my-4 text-white'>{cardioState.time}</strong>
								<strong className='my-4'>Distance (Mi) :</strong>
								<strong className='my-4 text-white'>{cardioState.distance}</strong>
								<strong className='my-4'>Calories Burned :</strong>
								<strong className='my-4 text-white'>{cardioState.caloriesBurned}</strong>
							</>
						}
					</div>
					{
						cardioState.isPreviousWorkoutChanged &&
						<Button text='Submit' color='primary-green' clickHandler={() => {
							const r = window.confirm('Are you sure you want to delete this cardio, THIS CANNOT BE UNDONE')
							if (!r) return
							dispatch(cardioSlice.updateCardioInfo())
						}} />}
				</Card>
			</main>
		</Layout >
	)
}

export default CardioHistoryPage