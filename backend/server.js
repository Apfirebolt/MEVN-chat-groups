import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import http from 'http'
import cors from 'cors'
import {Server, Socket} from 'socket.io'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { addMessage } from './controllers/messageController.js'

dotenv.config()

connectDB()

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origins: ['http://localhost:8080']
  }
})

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

const __dirname = path.resolve()
// set the view engine to ejs and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/backend/views'));

app.use('/api/users', userRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/upload', uploadRoutes)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// sample page
app.get('/sample', function(req, res) {
  res.render('sample');
});

app.use(notFound)
app.use(errorHandler)

let messageList = []
const users = []

io.on('connect', (socket) => {
  console.log('Connected to socket ', socket.id)
  socket.on('join', ({ name, room }, callback) => {
    if (users.indexOf(name) === -1) {
      users.push(name) 
    }
    socket.emit('joinUser', users);
    callback();
  });

  socket.on('sendMessage', ({ payload }, callback) => {
    try {
      messageList.push(payload)
      addMessage(payload)
      socket.emit('message', messageList);
    } catch(err) {
      callback();
    }
  });

  socket.on('clearUser', ({ username }, callback) => {
    try {
      const userIndex = users.indexOf(username);//get  "car" index
      //remove car from the colors array
      users.splice(userIndex, 1); // colors = ["red","blue","green"]
      socket.emit('leaveRoom');
      console.log(users)
    } catch(err) {
      callback();
    }
  });

  socket.on('clearMessages', () => {
    try {
      messageList = []
    } catch(err) {
      console.log(err)
    }
  });

  
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));