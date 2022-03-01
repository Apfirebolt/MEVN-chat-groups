import asyncHandler from 'express-async-handler'
import Chat from '../models/chatModel.js'

const addMessage = async (payload) => {

  await Chat.create({
    message: payload.message,
    sendBy: payload.userId,
    relatedRoom: payload.roomId
  })
}

export {
  addMessage,
}
