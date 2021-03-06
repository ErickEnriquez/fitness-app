
import React from 'react'
import ReactLoading from 'react-loading'
const Loading = (): JSX.Element => {
	const styles = {
		marginTop: '50px',
		display: 'flex',
		justifyContent: 'center',
	}
	return (
		<div style={styles}>
			<ReactLoading type='spin' color='#06b6d4' height={100} width={100} />
		</div>
	)
}

export default Loading