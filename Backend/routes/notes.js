const express = require("express")
const router = express.Router()
const fetchUser = require("../middleware/FectchUser")
const Note = require("../models/Note")
const { check, validationResult } = require("express-validator")

//Route for getting all the notes
router.get("/getAllNotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
  res.json(notes)
  console.log(notes)
})

//route for adding new notes with specific user id
router.post(
  "/addnote",
  fetchUser,
  [check("title").isLength({ min: 3 }), check("description").isLength({ min: 5 })],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body
      const result = validationResult(req)
      if (!result.isEmpty()) return res.json(result)
      const createNote = new Note({
        user: req.user.id,
        title,
        description,
        tag,
      })
      const savedNotes = await createNote.save()
      res.send(savedNotes)
    } catch (err) {
      res.json(err)
    }
  }
)
//route for updating an existing note in database
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const noteId = req.params.id
  if (!noteId) return res.status(404).send("Note not found")
  let GetNote = await Note.findById(noteId)

  if (GetNote.user.toString() !== req.user.id) return res.status(404).send("Unathorized user")
  const { title, description, tag } = req.body
  const newNote = {}
  if (title) newNote.title = title
  if (description) newNote.description = description
  if (tag) newNote.tag = tag

  GetNote = await Note.findByIdAndUpdate(noteId, { $set: newNote }, { new: true })
  res.json({ GetNote })
})

module.exports = router
