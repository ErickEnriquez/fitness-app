
import React from 'react'
import ReactLoading from 'react-loading'
const Loading = (): JSX.Element => {

	return (
		<div className='flex h-screen items-center justify-center'>
			<ReactLoading type='spin' color='#06b6d4' height={100} width={100} />
		</div>
	)
}

export default Loading