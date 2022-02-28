import express from 'express'
const router = express.Router()
import {
  createRoom,
  updateRoom,
  getAllRooms,
  deleteRoom,
  getSingleRoom
} from '../controllers/roomController.js'
import { protect } from '../middleware/authMiddleware.js'

router
  .route('/')
  .post(protect, createRoom)
  .get(protect, getAllRooms)
router
  .route('/:roomName')
  .get(protect, getSingleRoom)
  .put(protect, updateRoom)
  .delete(protect, deleteRoom)

export default router
