const router = require('express').Router()
// middlewares
const auth = require('../middleware/auth')
// models
const Note = require('../models/noteModel')

// routes
router.post('/', auth, async (req, res) => {
	try {
		const { title } = req.body

		// Validation
		if (!title)
			return res.status(400).json({ msg: 'Not all fields have been entered' })

		const newNote = new Note({
			title,
			userId: req.user,
		})

		const savedNote = await newNote.save()
		res.json(savedNote)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

router.get('/all', auth, async (req, res) => {
	const notes = await Note.find({ userId: req.user })
	res.json(notes)
})

module.exports = router
