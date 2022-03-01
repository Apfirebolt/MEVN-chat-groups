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
  .delete(protect, deleteRoom)
router
  .route('/:roomId')
  .put(protect, updateRoom)

export default router
