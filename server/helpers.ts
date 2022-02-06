import { Server } from 'socket.io'
import { IUser } from '../src/store'

export function generateName(socketId: string): string {
  return `Аноним №${socketId.slice(0, 5)}`
}

export function connectedUsers(io: Server): IUser[] {
  const users: IUser[] = []

  for (let [id, socket] of io.of('/').sockets) {
    users.push(<IUser>socket.data)
  }

  return users
}
