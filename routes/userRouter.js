const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/usermodel')

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

module.exports = router
