import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import ErrorNotice from './ErrorNotice'

import AuthContext from '../context/AuthContext'

import '../styles/components/LoginForm.css'

const LoginForm = () => {
	const history = useHistory()
	const { setUserData } = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const submitHandler = async e => {
		e.preventDefault()

		try {
			const loginUser = { email, password }

			const loginResponse = await axios.post(
				'http://localhost:5000/users/login',
				loginUser
			)

			setUserData({
				token: loginResponse.data.token,
				user: loginResponse.data.user,
			})
			// setup webtoken to local storage
			localStorage.setItem('auth-token', loginResponse.data.token)
			// redirect to home page
			history.push('/')
		} catch (err) {
			err.response.data.msg && setError(err.response.data.msg)
		}
	}

	return (
		<form className='auth__form' onSubmit={submitHandler}>
			{error && (
				<ErrorNotice message={error} closeError={() => setError(null)} />
			)}
			<h2 className='auth__form-title'>Register</h2>

			<div className='auth__form-group'>
				<label htmlFor='login-email'>Email:</label>
				<input
					id='login-email'
					type='email'
					onChange={e => setEmail(e.target.value)}
				/>
			</div>

			<div className='auth__form-group'>
				<label htmlFor='login-password'>Password:</label>
				<input
					id='login-password'
					type='password'
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<button className='auth__form-login-btn'>Log In</button>
		</form>
	)
}

export default LoginForm
