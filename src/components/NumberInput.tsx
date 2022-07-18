import React from 'react'

interface NumberInputProps {
	changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
	color?: string
	num: number
	name: string
	title?: string
}

const NumberInput = ({ color, changeHandler, num, name, title }: NumberInputProps) => {
	return (
		<span>
			<label htmlFor={name} className='text-white text-lg font-bold'>{title ||''}</label>
			<input type="number"
				name={name}
				placeholder={name}
				value={num}
				onChange={changeHandler}
				className={`outline mt-4 ${color || 'outline-cyan-700'} outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70`}
			/>
		</span>
	)
}

export default NumberInput