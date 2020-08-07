import React from 'react'
import { useHistory } from 'react-router-dom'

import '../styles/components/AuthButtons.css'

const AuthButtons = () => {
	const history = useHistory()

	const register = () => history.push('/register')
	const login = () => history.push('/login')

	return (
		<div className='button-group'>
			<button onClick={register}>Register</button>
			<button onClick={login}>Login</button>
		</div>
	)
}

export default AuthButtons
