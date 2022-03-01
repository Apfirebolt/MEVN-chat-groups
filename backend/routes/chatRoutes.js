import express from 'express'
const router = express.Router()
import {
  getRoomChat
} from '../controllers/messageController.js'
import { protect } from '../middleware/authMiddleware.js'

router
  .route('/:roomId')
  .get(protect, getRoomChat)

export default router
