import { useCallback } from 'react'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { updateActiveConversation } from '@store/ui/slice'
import { ConversationsState } from '@store/conversations/initialState'
import { updateSingleConversation } from '@store/conversations/slice'

export default function useOnUpdateMessages() {
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
            messages: (activeConversation?.messages || []).map((msg) => ({
              ...msg,
              seen: true,
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
                seen: true,
              })),
            },
          }),
        )
      }
    },
    [activeConversation, conversations, dispatch],
  )
  return handleUpdateMessagesSeen
}
