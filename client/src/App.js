import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import './styles/index.css'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// contexts
import AuthContext from './context/AuthContext'
// components
import Header from './layout/Header'

const App = () => {
	const [userData, setUserData] = useState({
		token: null,
		user: null,
	})

	useEffect(() => {
		const checkLoggedIn = async () => {
			let token = localStorage.getItem('auth-token')
			if (token === null) {
				localStorage.setItem('auth-token', '')
				token = ''
			}

			const tokenResponse = await axios.post(
				'http://localhost:5000/users/tokenIsValid',
				null,
				{ headers: { 'x-auth-token': token } }
			)
			if (tokenResponse.data) {
				const userResponse = await axios.get('http://localhost:5000/users/', {
					headers: { 'x-auth-token': token },
				})

				setUserData({
					token,
					user: userResponse.data,
				})
			}
		}

		checkLoggedIn()
	}, [])

	return (
		<div className='App'>
			<Router>
				<AuthContext.Provider value={{ userData, setUserData }}>
					<Header />
					<Switch>
						<Route path='/' component={Home} exact />
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
					</Switch>
				</AuthContext.Provider>
			</Router>
		</div>
	)
}

export default App
