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
// get all user notes
router.get('/all', auth, async (req, res) => {
	const notes = await Note.find({ userId: req.user })
	res.json(notes)
})
// delete note
router.delete('/:id', auth, async (req, res) => {
	const note = await Note.findOne({ userId: req.user, _id: req.params.id })
	if (!note) {
		return res.status(400).json({
			msg: 'No note found with this ID that belongs to the current user',
		})
	}
	const deletedNote = await Note.findByIdAndDelete(req.params.id)
	res.json(deletedNote)
})

module.exports = router
