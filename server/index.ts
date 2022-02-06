import { Server } from 'socket.io'
import { IUser, Waypoints } from '@/store'
import { generateName, connectedUsers } from './helpers'

interface ClientToServerEvents {
  getWaypoints: (waypoints: Waypoints) => void
}

interface ServerToClientEvents {
  usersChange: (users: IUser[]) => void
  getWaypoints: (users: IUser[]) => void
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

  socket.on('getWaypoints', (waypoints) => {
    socket.data.waypoints = waypoints
  })
})

setInterval(() => {
  io.emit('getWaypoints', connectedUsers(io))
}, 5000)
