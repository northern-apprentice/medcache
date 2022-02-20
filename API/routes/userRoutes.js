const express = require('express')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const router = express.Router()
const User = require('../models/user')

// Getting all
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.post('/login', getUser, (req, res) => {
  return;
})

// Creating one
router.post('/register', async (req, res) => {

  try {
    const existingUser = await User.findOne({email:req.body.email})
    if (existingUser) {
      res.status(409).json({
        payload: {
          success: false,
          message: `user ${existingUser.email} already exists`
        }
      })
      return;
    }
    const user = new User({
      email: req.body.email,
      password: req.body.password
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    const newUser = await user.save()
    res.status(201).json({
      payload: {
        success: true,
        message: `user ${newUser.email} successfully created`
      }
    })
  } catch (err) {
    res.status(400).json({
      payload: {
        success: false,
        message: err.message,
      }
    })
  }
})

// // Updating One
// router.patch('/:id', getUser, async (req, res) => {
//   if (req.body.name != null) {
//     res.subscriber.name = req.body.name
//   }
//   if (req.body.subscribedToChannel != null) {
//     res.subscriber.subscribedToChannel = req.body.subscribedToChannel
//   }
//   try {
//     const updatedSubscriber = await res.subscriber.save()
//     res.json(updatedSubscriber)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// // Deleting One
// router.delete('/:id', getSubscriber, async (req, res) => {
//   try {
//     await res.subscriber.remove()
//     res.json({ message: 'Deleted Subscriber' })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

async function getUser(req, res, next) {
  let user
  console.log(process.env.SECRET_KEY);
  try {
    user = await User.findOne({email: req.body.email})
    if (user == null) {
      return res.status(404).json({
        payload: {
          success: false,
          user: null,
          token: null,
          message: 'invalid username or password'
        }
      })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      res.status(200).json({
        payload: {
          user: user.email,
          token: await(generateAccessToken(user.email)),
          success: true,
          message: ""
        }
      })
    }
    else (
      res.status(401).json({
        payload: {
          user: user.email,
          token: '',
          success: true,
          message: "invalid username or password"
        }
      })
    )
  } catch (err) {
    return res.status(500).json({
      payload: {
        success: false,
        user: null,
        token: null,
        message: err.message
      }
    })
  }

  next()
}


function generateAccessToken(username) {
  return jwt.sign({user:username}, process.env.SECRET_KEY, { expiresIn: '1600s' });
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

module.exports = router