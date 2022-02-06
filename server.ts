import { Server } from 'socket.io'

const io = new Server(3000, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('new user ', socket.id)

  socket.on('disconnect', () => {
    console.log('remove user ', socket.id)
  })
})
