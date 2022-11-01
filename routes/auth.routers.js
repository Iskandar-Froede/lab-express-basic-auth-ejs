const express = require('express')
const User = require('../models/User.model')
const router = express.Router()
const bcrypt = require('bcryptjs')


router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', async(req,res) => {
  try {

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

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

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

module.exports = router;