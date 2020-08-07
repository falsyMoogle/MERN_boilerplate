import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/layout/Header.css'

import AuthButtons from '../components/AuthButtons'

const Header = () => {
	return (
		<header className='header'>
			<div className='header__brand'>
				<Link to='/'>
					<h1 className='header__brand__title'>MERN Auth</h1>
				</Link>
			</div>
			<AuthButtons />
		</header>
	)
}

export default Header
