import React from 'react'

interface NotesProps {
	changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	val: string
	placeholder?: string
}

const Notes = ({ val, changeHandler, placeholder }: NotesProps) => {
	return (
		<>
			<label htmlFor="cardio-notes" className='text-white text-lg font-bold text-center'>Notes</label>
			<textarea name="cardio-notes"
				id="" rows={6}
				value={val}
				onChange={changeHandler}
				className='outline my-6 outline-primary-blue outline-4 rounded-3xl placeholder:text-slate-600 text-center py-4 w-11/12 block mx-auto  shadow-lg shadow-black/70'
				placeholder={`${placeholder || 'Any Notes To Add'}`}>
			</textarea>
		</>
	)
}

export default Notes