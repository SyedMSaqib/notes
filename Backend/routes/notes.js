const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/FectchUser");
const Note = require("../models/Note");
const { check, validationResult } = require("express-validator");

//Route for getting all the notes
router.get("/getAllNotes", fetchUser, async (req, res) => {
  const notes = await Note.findOne({ id: req.user.id });
  res.json(notes);

  //route for adding new notes with specific user id
  router.post(
    "/addnote",
    fetchUser,
    [check("title").isLength({ min: 3 }), check("description").isLength({ min: 5 })],
    async (req, res) => {
      try {
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) return res.json(result);
        const createNote = new Note({
          user: req.user.id,
         title,description,tag
        });
        const savedNotes=await createNote.save()
        res.send(savedNotes);
      } catch (err) {
        res.json(err);
      }
    }
  );
});
module.exports = router;
