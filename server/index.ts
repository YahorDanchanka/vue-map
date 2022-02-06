import { Server } from 'socket.io'
import { IUser } from '@/store'
import { generateName, connectedUsers } from './helpers'

interface ClientToServerEvents {}

interface ServerToClientEvents {
  usersChange: (users: IUser[]) => void
}

interface InterServerEvents {}

interface SocketData extends IUser {}

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(3000, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  socket.data = { id: socket.id, name: generateName(socket.id) }
  io.emit('usersChange', connectedUsers(io))

  socket.on('disconnect', () => {
    io.emit('usersChange', connectedUsers(io))
  })
})
