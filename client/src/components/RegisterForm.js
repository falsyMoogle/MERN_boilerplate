import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import AuthContext from '../context/AuthContext'

import '../styles/components/RegisterForm.css'

const RegisterForm = () => {
	const history = useHistory()
	const { setUserData } = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordCheck, setPasswordCheck] = useState('')
	const [displayName, setDisplayName] = useState('')

	const submitHandler = async e => {
		e.preventDefault()
		try {
			const newUser = { email, password, passwordCheck, displayName }
			console.log('newUser', newUser)
			// register user request
			await axios.post('http://localhost:5000/users/register', newUser)
			// login user and get user obj with data which includes webtoken
			const loginResponse = await axios.post(
				'http://localhost:5000/users/login',
				{
					email,
					password,
				}
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
			throw new Error(err.response.data.msg)
		}
	}

	return (
		<form className='auth__form' onSubmit={submitHandler}>
			<h2 className='auth__form-title'>Register</h2>

			<div className='auth__form-group'>
				<label htmlFor='register-email'>Email:</label>
				<input
					id='register-email'
					type='email'
					onChange={e => setEmail(e.target.value)}
				/>
			</div>

			<div className='auth__form-group'>
				<label htmlFor='register-password'>Password:</label>
				<input
					id='register-password'
					type='password'
					onChange={e => setPassword(e.target.value)}
				/>
			</div>

			<div className='auth__form-group'>
				<label htmlFor='register-password-check'>Verify password:</label>
				<input
					id='register-password-check'
					type='password'
					onChange={e => setPasswordCheck(e.target.value)}
				/>
			</div>

			<div className='auth__form-group'>
				<label htmlFor='register-name'>Display name:</label>
				<input
					id='register-name'
					type='text'
					onChange={e => setDisplayName(e.target.value)}
				/>
			</div>

			<button className='auth__form-button'>Register</button>
		</form>
	)
}

export default RegisterForm
