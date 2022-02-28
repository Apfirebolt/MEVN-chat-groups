import asyncHandler from 'express-async-handler'
import Chat from '../models/chatModel.js'

const addMessage = asyncHandler(async (req, res) => {
    console.log('Inside add message')

//   const { username, password } = req.body

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(401)
//     throw new Error('Invalid chat data')
//   }
})

export {
  addMessage,
}
