import { useCallback } from 'react'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { updateActiveConversation } from '@store/ui/slice'
import { ConversationsState } from '@store/conversations/initialState'
import { updateSingleConversation } from '@store/conversations/slice'

export default function useOnUpdateMessagesSeen() {
  const dispatch = useDispatch()

  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const handleUpdateMessagesSeen = useCallback(
    (acknowledgement: { acknowledged: boolean; conversationId: string }) => {
      if (acknowledgement.conversationId === activeConversation?._id) {
        dispatch(
          updateActiveConversation({
            ...activeConversation,
            unSeenMsgsCount: 0,
            messages: (activeConversation?.messages || []).map((msg) => ({
              ...msg,
              seen: msg.recipients.length > 1,
              delivered: msg.recipients.length > 1,
            })),
          }),
        )
      }
      const conversationInState = conversations.filter(
        (conversation) => conversation._id === acknowledgement.conversationId,
      )[0]
      if (conversationInState) {
        dispatch(
          updateSingleConversation({
            conversationId: acknowledgement.conversationId,
            update: {
              ...conversationInState,
              messages: (conversationInState.messages || []).map((msg) => ({
                ...msg,
                seen: msg.recipients.length > 1,
                delivered: msg.recipients.length > 1,
              })),
              unSeenMsgsCount: 0,
              latestMessage: conversationInState.latestMessage
                ? {
                    ...conversationInState.latestMessage,
                    seen:
                      conversationInState.latestMessage.recipients.length > 1,
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
  return handleUpdateMessagesSeen
}
