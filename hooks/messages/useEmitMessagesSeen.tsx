import { useCallback } from 'react'
import { messagesEvents } from '@store/messages/initialState'
import useEmitter from '@hooks/useEmitters'
import useMessages from '@sockets/useMessages'

export default function useEmitMessagesSeen() {
  const messagesSocket = useMessages()
  const messagesSocketEmitters = useEmitter(messagesSocket, messagesEvents)

  const handleEmitMessagesSeen = useCallback(
    (conversationId: string, participants: string[]) => {
      messagesSocketEmitters.messagesSeen({
        conversationId,
        participants,
      })
    },
    [messagesSocketEmitters],
  )
  return handleEmitMessagesSeen
}
