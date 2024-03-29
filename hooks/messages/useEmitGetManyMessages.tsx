import { useCallback } from 'react'
import { messagesEvents } from '@store/messages/initialState'
import useEmitter from '@hooks/useEmitters'
import useMessages from '@sockets/useMessages'
import { messagesLimit } from '@store/ui/initialState'

export default function useEmitGetManyMessages() {
  const messagesSocket = useMessages()
  const messagesSocketEmitters = useEmitter(messagesSocket, messagesEvents)

  const handleGetManyMessages = useCallback(
    (conversationId: string, page?: number) => {
      messagesSocketEmitters.getMany({
        conversationId,
        page: page || 1,
        sort: '-createdAt',
        limit: messagesLimit,
      })
    },
    [messagesSocketEmitters],
  )
  return handleGetManyMessages
}
