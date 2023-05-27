const express = require("express")
const router = express.Router()
const fetchUser = require("../middleware/FectchUser")
const Note = require("../models/Note")
const { check, validationResult } = require("express-validator")

//Route for getting all the notes
router.get("/getAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
    console.log(notes)
  } catch (err) {
    res.status(500).send("Internal Server Error")
    console.log(err)
  }
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
  try {
    GetNote = await Note.findByIdAndUpdate(noteId, { $set: newNote }, { new: true })
    res.json({ GetNote })
  } catch (err) {
    res.status(500).send("Internal Server Error")
    console.log(err)
  }
})

router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  const noteId = req.params.id
  if (!noteId) return res.status(404).send("Oops, no such id exists")
  let getNote = await Note.findById(noteId)
  if (!getNote) return res.status(404).send("No such note exists")

  const userIdFromDb = getNote.user.toString()
  if (userIdFromDb !== req.user.id) return res.send("Unathorized user")
  try {
    getNote = await Note.findByIdAndDelete(noteId)
    res.send(`Note deleted successfully ${getNote}`)
  } catch (err) {
    res.status(500).send("Internal Server Error")
    console.log(err)
  }
})

module.exports = router
