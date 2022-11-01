const express = require('express')
const User = require('../models/User.model')
const router = express.Router()
const bcrypt = require('bcryptjs')
const app = require('../app')


router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

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

router.get('/login', (req, res) => {
  res.render('auth/login')
})


router.post('auth/login', async(req, res) => {

  const { username, password } = req.body
  const currentUser = await User.findOne({ username })

  if (!currentUser) {
    res.render('auth/login', { errorMessage: 'No user with this username'})

  } else {
    
    if (bcrypt.compareSync(password, currentUser.password)) {
      console.log('Correct password')
     
      req.session.user = currentUser
      res.redirect('/user-profile')
    } else { 
      res.render('auth/login', { errorMessage: 'Incorrect password !!!'})
    } 
  }
  })


  router.get('/users/user-profile', (req, res) => {
    res.render('users/user-profile')
  })

  router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        next(err)
      }
      res.redirect('/auth/login')
    })
  })

module.exports = router;