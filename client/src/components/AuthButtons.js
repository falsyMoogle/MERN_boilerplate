import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthContext from '../context/AuthContext'

import '../styles/components/AuthButtons.css'

const AuthButtons = () => {
	const { userData, setUserData } = useContext(AuthContext)
	const history = useHistory()

	const register = () => history.push('/register')
	const login = () => history.push('/login')
	const logout = () => {
		setUserData({
			token: null,
			user: null,
		})
		localStorage.setItem('auth-token', '')
	}

	return (
		<div className='button-group'>
			{userData.user ? (
				<button onClick={logout}>Logout</button>
			) : (
				<>
					<button onClick={register}>Register</button>
					<button onClick={login}>Login</button>
				</>
			)}
		</div>
	)
}

export default AuthButtons
