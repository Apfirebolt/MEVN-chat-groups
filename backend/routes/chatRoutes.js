import express from 'express'
const router = express.Router()
import {
  getRoomChats,
  deleteChatMessage
} from '../controllers/messageController.js'
import { protect } from '../middleware/authMiddleware.js'

router
  .route('/:roomId')
  .get(protect, getRoomChats)
router
  .route('/:roomId/messages/:messageId')
  .delete(protect, deleteChatMessage)

export default router
