const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const key = "02192000";
const fetchUser=require("../middleware/FectchUser")
router.post(
  '/signup',
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.json(result);

    try {
      let user = await User.findOne({ email: req.body.email }); //checking if user is already registererd or not by email
      if (user)
        return res.status(500).send(`${req.body.email} is already registered`); // throwing already registered error

      var salt = await bcrypt.genSaltSync(10);
      var securePassword = await bcrypt.hashSync(req.body.password, salt);

      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
      });

      const data = {
        //getting user id for token first part..
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, key); //creating token by signing token with that secret key declared at the top of the page
      res.send({ token });
    } catch (err) {
      res.status(500).json(`"errors are": ${err}`);
    }
  }
);

//post method for login
router.post(
  '/login',
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  async (req, res) => {
    const result =  validationResult(req);
    if (!result.isEmpty()) return res.send("Enter correct credentials");
    try{
    const { email, password } = req.body;
    let user = await User.findOne({email: email});
    if (!user)
      return res.send("Incorrect Email, please provide valid email address.");

    const hashedPassword =  user.password;
    const comparePassword =  bcrypt.compareSync(password, hashedPassword);
    if (!comparePassword)
      return res.status(500).json({ error: "Incorrect Password" });

    const data = {
      user: {
        id: user.id,
      },
    };

    var token = jwt.sign(data, key);
    return res.json({token});
    }
    catch(err)
    {
      res.status(500).send("Internal Server Error")
      console.log(err)
    }
  }
);
//getting user details of loggedin users  
router.post("/userDetails", fetchUser, async (req, res) => {
  try {
    const userid =req.user.id;
    console.log(userid)
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


module.exports = router;
