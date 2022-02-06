export function generateName(socketId: string): string {
  return `Аноним №${socketId.slice(0, 5)}`
}
