import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './styles/index.css'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// components
import Header from './layout/Header'

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Header />
				<Switch>
					<Route path='/' component={Home} exact />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
