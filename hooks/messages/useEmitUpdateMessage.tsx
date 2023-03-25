import { useCallback } from 'react'
import { Message, messagesEvents } from '@store/messages/initialState'
import useEmitter from '@hooks/useEmitters'
import useMessages from '@sockets/useMessages'

export default function useUpdateMessages() {
  const messagesSocket = useMessages()
  const messagesSocketEmitters = useEmitter(messagesSocket, messagesEvents)

  const handleUpdateMessagesSeen = useCallback(
    (conversationId: string, participants: string[]) => {
      messagesSocketEmitters.messagesSeen({
        conversationId,
        participants,
      })
    },
    [messagesSocketEmitters],
  )
  return handleUpdateMessagesSeen
}
