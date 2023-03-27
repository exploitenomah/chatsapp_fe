import { useCallback } from 'react'
import {  messagesEvents } from '@store/messages/initialState'
import useEmitter from '@hooks/useEmitters'
import useMessages from '@sockets/useMessages'

export default function useEmitMessagesDelivered() {
  const messagesSocket = useMessages()
  const messagesSocketEmitters = useEmitter(messagesSocket, messagesEvents)

  const handleEmitMessagesDelivered = useCallback(
    (conversationId: string, participants: string[]) => {
      messagesSocketEmitters.messagesDelivered({
        conversationId,
        participants,
      })
    },
    [messagesSocketEmitters],
  )
  return handleEmitMessagesDelivered
}
