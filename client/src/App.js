import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
			</Switch>
		</Router>
	)
}

export default App
