const express = require('express')
const User = require('../models/User.model')
const router = express.Router()
const bcrypt = require('bcryptjs')


router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post('/signup', async(req,res) => {
  try {

    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })
    res.redirect('/auth/login')

  } catch (error) {
    console.log(error.message)
    res.render('auth/signup', { errorMessage: error.message})
  }
})

router.get("/login", (req, res, next) => {
  res.render("login");
});

module.exports = router;