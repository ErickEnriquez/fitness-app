import React from 'react'

interface props {
	title?: string
	children?: React.ReactNode
	style?: React.CSSProperties
}

const Card = ({ title, children, style }: props) => {
	return (
		<div className="bg-slate-700 rounded-3xl content-center w-11/12 mx-auto py-4" >
			<h2
				style={style}
				className='text-2xl font-bold text-white'>{title || 'PlaceholderTitle'}</h2>
			{children}
		</div>
	)
}

export default Card