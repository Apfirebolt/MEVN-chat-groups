import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";

// @desc    Create Chat Room for logged in users
// @route   POST /api/rooms
// @access  Private
const createRoom = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const doesRoomExist = await Room.findOne({
    name
  });

  if (doesRoomExist) {
    res.status(409);
    throw new Error("Someone else has already created a room with that name");
  }

  const room = await Room.create({
    name,
    createdBy: req.user._id,
  });
  if (room) {
    res.status(201).json(room);
  } else {
    res.status(400);
    throw new Error("Invalid Chat Room data");
  }
});

// @desc    Get all chat rooms
// @route   POST /api/rooms
// @access  Public
const getAllRooms = asyncHandler(async (req, res) => {
  const itemsPerPage = 10;
  const startPage = req.query.page || 1;
  await Room.find({})
    .populate("createdBy", 'firstName lastName')
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage)
    .exec(function (err, rooms) {
      Room.countDocuments().exec(function (err, count) {
        if (err) return next(err);
        res.status(200).json({
          rooms,
          count,
          success: true,
          itemsPerPage,
          startPage,
          lastPage: Math.ceil(count / itemsPerPage),
        });
      });
    });
});

// @desc    Delete a chat room
// @route   DELETE /api/rooms/roomName
// @access  Private
const deleteRoom = asyncHandler(async (req, res) => {
  const isRoomDeleted = await Room.deleteOne(
    { createdBy: req.user._id, _id: req.params.id },
    {
      useFindAndModify: false,
    }
  );

  if (isRoomDeleted) {
    res.json({
      message: "Chat Room deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Chat Room not found");
  }
});

// @desc    Get a chat room
// @route   GET /api/rooms/roomName
// @access  Private
const getSingleRoom = asyncHandler(async (req, res) => {
  const room = await Room.findOne({
    name: req.params.roomName,
  });

  if (room) {
    res.json({
      room,
    });
  } else {
    res.status(404);
    throw new Error("Chat Room not found");
  }
});

// @desc    Update chat room
// @route   PUT /api/rooms/roomName
// @access  Private
const updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findOneAndUpdate(
    { createdBy: req.user._id, _id: req.params.id },
    req.body,
    {
      new: true,
      useFindAndModify: false,
    }
  );

  if (room) {
    res.json(room);
  } else {
    res.status(404);
    throw new Error("Chat Room not found");
  }
});

export { createRoom, deleteRoom, getAllRooms, updateRoom, getSingleRoom };
