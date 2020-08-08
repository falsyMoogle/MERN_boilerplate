const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// middlewares
const auth = require('../middleware/auth')
// models
const User = require('../models/userModel')

// register
router.post('/register', async (req, res) => {
	try {
		let { email, password, passwordCheck, displayName } = req.body
		const existingUser = await User.findOne({ email: email })

		// validation
		if (!email || !password || !passwordCheck)
			return res.status(400).json({ msg: 'Not all fields have been entered' })

		if (password.length < 5)
			return res
				.status(400)
				.json({ msg: 'The password needs to be at least 5 characters' })

		if (password !== passwordCheck)
			return res
				.status(400)
				.json({ msg: 'Enter the same password twice for verification' })

		if (existingUser)
			return res
				.status(400)
				.json({ msg: 'An account with this email already exists' })

		if (!displayName) displayName = email

		// crypting password by bcrypt
		const salt = await bcrypt.genSalt()
		const passwordHash = await bcrypt.hash(password, salt)

		// save user to db
		const newUser = new User({
			email,
			password: passwordHash,
			displayName,
		})
		const savedUser = await newUser.save()

		// send user data to frontend
		res.json(savedUser)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		// validation
		if (!email || !password)
			return res.status(400).json({ msg: 'Not all fields have been entered' })

		// finding user
		const user = await User.findOne({ email: email })
		if (!user)
			return res
				.status(400)
				.json({ msg: 'No account with this email has been registered' })

		// matching passwords
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) return res.status(400).json({ msg: 'Invalid credencials' })

		// set up jwt
		const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
		res.json({
			token,
			user: {
				id: user._id,
				displayName: user.displayName,
				email: user.email,
			},
		})
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// deleting an user
router.delete('/delete', auth, async (req, res) => {
	try {
		const deletedUser = await User.findOneAndDelete(req.user)
		res.json(deletedUser)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// verify a token
router.post('/tokenIsValid', async (req, res) => {
	try {
		const token = req.header('x-auth-token')
		if (!token) return res.json(false)

		const verified = jwt.verify(token, process.env.JWT_TOKEN)
		if (!verified) return res.json(false)

		const user = await User.findById(verified.id)
		if (!user) return res.json(false)

		return res.json(true)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user)
		console.log('user', user)
		res.json({
			id: user._id,
			displayName: user.displayName,
		})
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

module.exports = router
