import asyncHandler from 'express-async-handler'
import Chat from '../models/chatModel.js'

const addMessage = async (payload) => {

  await Chat.create({
    message: payload.message,
    sendBy: payload.userId,
    relatedRoom: payload.roomId
  })
}

// @desc    Get all chat rooms
// @route   POST /api/chats
// @access  Private
const getRoomChats = asyncHandler(async (req, res) => {

  const itemsPerPage = 10;
  const startPage = req.query.page || 1;
  await Chat.find({
    relatedRoom: req.params.roomId
  })
    .populate("sendBy", 'firstName lastName')
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage)
    .exec(function (err, chats) {
      Chat.countDocuments().exec(function (err, count) {
        if (err) return next(err);
        res.status(200).json({
          chats,
          count,
          success: true,
          itemsPerPage,
          startPage,
          lastPage: Math.ceil(count / itemsPerPage),
        });
      });
    });
});

// @desc    Delete a chat message
// @route   DELETE /api/chats/id
// @access  Private
const deleteChatMessage = asyncHandler(async (req, res) => {
  const isChatDeleted = await Chat.deleteOne(
    { sendBy: req.user._id, id: req.params.id },
    {
      useFindAndModify: false,
    }
  );

  if (isChatDeleted) {
    res.json({
      message: "Chat Message deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Chat Message not found");
  }
});

export {
  addMessage,
  getRoomChats,
  deleteChatMessage
}
