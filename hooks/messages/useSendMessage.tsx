import useMessages from '@sockets/useMessages'
import { useCallback } from 'react'
import useEmitter from '../useEmitters'
import { messagesEvents } from '@store/messages/initialState'
import { Conversation } from '@store/conversations/initialState'

export default function useSendMessage() {
  const messagesSocket = useMessages()
  const messagesSocketEmitters = useEmitter(messagesSocket, messagesEvents)

  const handleSendMessage = useCallback(
    (
      conversation: Conversation,
      message: {
        text: string
        attachments: any[]
        sender: string
        quotedMessage?: string
      },
    ) => {
      messagesSocketEmitters.new({
        sender: message.sender,
        conversationId: conversation._id,
        text: message.text,
        recipients: conversation.participants.map(
          (participant) => participant._id,
        ),
        quotedMessage: message.quotedMessage,
      })
    },
    [messagesSocketEmitters],
  )
  return handleSendMessage
}
