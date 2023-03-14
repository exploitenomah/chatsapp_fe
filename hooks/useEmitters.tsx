import { useMemo } from 'react'
import { Socket } from 'socket.io-client'

export default function useEmitter(socket: Socket, events: string[]) {
  const emitters = useMemo(() => {
    return events.reduce((acc, event) => {
      return {
        ...acc,
        [event]: (data?: any) => {
          socket.emit(event, data)
        },
      }
    }, {})
  }, [events, socket])
  return emitters as { [x: string]: (data?: any) => void }
}
