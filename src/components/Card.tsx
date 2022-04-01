import React from 'react'

interface props {
	title?: string
	children?: React.ReactNode
}

const Card = ({ title, children }: props) => {
	return (
		<div className="bg-slate-700 rounded-3xl content-center w-11/12 mx-auto" >
			<h2 className='text-2xl font-bold text-white'>{title || 'PlaceholderTitle'}</h2>
			{children}
		</div>
	)
}

export default Card