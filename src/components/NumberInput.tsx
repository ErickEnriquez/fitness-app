import React from 'react'

interface NumberInputProps {
	changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
	num: number
	name: string
	title?: string
}

const NumberInput = ({  changeHandler, num, name, title }: NumberInputProps) => {
	return (
		<span>
			<label htmlFor={name} className='text-white text-lg font-bold'>{title || ''}</label>
			<input type="number"
				name={name}
				placeholder={name}
				value={num}
				onChange={changeHandler}
				className={`ring-4 ring-primary-blue 
				rounded-3xl placeholder:text-slate-600 text-center my-4 py-4 w-11/12 block mx-auto
				shadow-lg shadow-black/70 text-black`}
			/>
		</span>
	)
}

export default NumberInput