import useEmitter from '@hooks/useEmitters'
import useConversations from '@sockets/useConversations'
import { conversationsEvents } from '@store/conversations/initialState'
import { useEffect } from 'react'

export default function useEmitUnSeenMsgsCount(conversationId: string) {
  const conversationsSocket = useConversations()
  const conversationEmitters = useEmitter(
    conversationsSocket,
    conversationsEvents,
  )
  useEffect(() => {
    conversationEmitters.unSeenMsgsCount({ conversationId })
  }, [conversationEmitters, conversationId])
}
