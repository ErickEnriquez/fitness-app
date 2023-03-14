import React from 'react'

interface NotesProps {
	changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	val: string
	placeholder?: string
}

const Notes = ({ val, changeHandler, placeholder }: NotesProps) => {
	return (
		<>
			<textarea name="cardio-notes"
				id="" rows={6}
				value={val}
				onChange={changeHandler}
				className='ring-4 ring-primary-blue ring-inset rounded-3xl placeholder:text-slate-600 text-center my-6 py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
				placeholder={`${placeholder || 'Any Notes To Add'}`}>
			</textarea>
		</>
	)
}

export default Notes