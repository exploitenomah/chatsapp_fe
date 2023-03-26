import { useCallback } from 'react'
import { Message } from '@store/messages/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { updateActiveConversation } from '@store/ui/slice'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'
import { updateSingleConversation } from '@store/conversations/slice'
import { ConversationsState } from '@store/conversations/initialState'

export default function useOnNewMessage() {
  const dispatch = useDispatch()

  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const handleNewMessage = useCallback(
    (message: Message) => {
      if (message.conversationId === activeConversation?._id) {
        dispatch(
          updateActiveConversation({
            ...activeConversation,
            messages: makeUniqueArrOfObjectsWith_IdKey([
              message,
              ...(activeConversation?.messages || []),
            ]),
            latestMessage: message,
          }),
        )
      }
      const conversationInState = conversations.filter(
        (conversation) => conversation._id === message.conversationId,
      )[0]
      if (conversationInState) {
        dispatch(
          updateSingleConversation({
            conversationId: message.conversationId,
            update: {
              ...conversationInState,
              messages: makeUniqueArrOfObjectsWith_IdKey([
                ...(conversationInState.messages || []),
                message,
              ]),
              latestMessage: message,
            },
          }),
        )
      }
    },
    [activeConversation, conversations, dispatch],
  )
  return handleNewMessage
}
