import { useCallback } from 'react'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { updateActiveConversation } from '@store/ui/slice'
import { ConversationsState } from '@store/conversations/initialState'
import { updateSingleConversation } from '@store/conversations/slice'

export default function useOnUpdateMessagesDelivered() {
  const dispatch = useDispatch()

  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const handleUpdateMessagesDelivered = useCallback(
    (acknowledgement: { acknowledged: boolean; conversationId: string }) => {
      if (acknowledgement.conversationId === activeConversation?._id) {
        dispatch(
          updateActiveConversation({
            ...activeConversation,
            messages: (activeConversation?.messages || []).map((msg) => ({
              ...msg,
              delivered: msg.recipients.length > 1,
            })),
          }),
        )
      }
      const conversationInState = conversations.filter(
        (conversation) => conversation._id === acknowledgement.conversationId,
      )[0]
      const hasUndeliveredMsgs = conversationInState.messages?.some(
        (msg) => msg.delivered === false,
      )
      if (conversationInState && hasUndeliveredMsgs) {
        dispatch(
          updateSingleConversation({
            conversationId: acknowledgement.conversationId,
            update: {
              ...conversationInState,
              messages: (conversationInState.messages || []).map((msg) => ({
                ...msg,
                delivered: msg.recipients.length > 1 && true,
              })),
              latestMessage: conversationInState.latestMessage
                ? {
                    ...conversationInState.latestMessage,
                    delivered:
                      conversationInState.latestMessage.recipients.length > 1,
                  }
                : undefined,
            },
          }),
        )
      }
    },
    [activeConversation, conversations, dispatch],
  )
  return handleUpdateMessagesDelivered
}
