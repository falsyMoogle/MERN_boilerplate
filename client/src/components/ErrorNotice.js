import React from 'react'

import '../styles/components/ErrorNotice.css'

const ErrorNotice = props => {
	return (
		<div className='error-notice'>
			<span>{props.message}</span>
			<button className='error-notice__close' onClick={props.closeError}>
				&times;
			</button>
		</div>
	)
}

export default ErrorNotice
