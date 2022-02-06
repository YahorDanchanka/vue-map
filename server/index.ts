import { Server } from 'socket.io'
import { IUser } from '@/store'
import { generateName } from './helpers'

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

export function connectedUsers(): IUser[] {
  const users: IUser[] = []

  // @ts-ignore
  for (let [id, socket] of io.of('/').sockets) {
    users.push(<IUser>socket.data)
  }

  return users
}

io.on('connection', (socket) => {
  socket.data = { id: socket.id, name: generateName(socket.id) }
  io.emit('usersChange', connectedUsers())

  socket.on('disconnect', () => {
    io.emit('usersChange', connectedUsers())
  })
})
