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

io.on('connect', (socket) => {
  console.log('Connected to socket ', socket.id)
  socket.on('join', ({ name, room }, callback) => {
    console.log('Joined room ', name, room)
    addMessage()

    socket.emit('message', { text: 'Dragon awakens' });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    

    callback();
  });
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));