import {
  Conversation,
  ConversationsState,
} from '@store/conversations/initialState'
import { updateSingleConversation } from '@store/conversations/slice'
import { Store } from '@store/index'
import { Message } from '@store/messages/initialState'
import { messagesLimit, UI } from '@store/ui/initialState'
import { updateActiveConversation } from '@store/ui/slice'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useHandleGetManyMessages() {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )

  const dispatch = useDispatch()

  const formatUpdatedConversation = useCallback(
    (oldConversation: Conversation, messages: Message[]) => {
      const newMessages = makeUniqueArrOfObjectsWith_IdKey([
          ...messages,
          ...(oldConversation.messages || []),
        ])
      const updatedConversation = {
        ...oldConversation,
        messages: newMessages,
        hasFetchedInitialMessages: true,
        hasFetchedAllMessages: messages.length < messagesLimit,
        messagesPage: (newMessages.length / messagesLimit || 0) + 1,
      }
      return updatedConversation
    },
    [],
  )

  const handleGetManyMessages = useCallback(
    (messages: Message[]) => {
      const conversationIdOfFirstMessage = messages[0]?.conversationId
      const allAreMessagesOfTheSameConversation = messages.every(
        (msg) => msg.conversationId === conversationIdOfFirstMessage,
      )
      if (allAreMessagesOfTheSameConversation) {
        let updatedConversation
        if (activeConversation) {
          const allAreMessagesOfActiveConversation =
            conversationIdOfFirstMessage === activeConversation._id
          if (allAreMessagesOfActiveConversation) {
            updatedConversation = formatUpdatedConversation(
              activeConversation,
              messages,
            )
            dispatch(updateActiveConversation(updatedConversation))
          }
        } else {
          const conversationInState = conversations.filter(
            (conversation) => conversation._id === conversationIdOfFirstMessage,
          )[0]
          if (conversationInState)
            updatedConversation = formatUpdatedConversation(
              conversationInState,
              messages,
            )
        }
        updatedConversation &&
          dispatch(
            updateSingleConversation({
              conversationId: conversationIdOfFirstMessage,
              update: updatedConversation,
            }),
          )
      }
    },
    [activeConversation, conversations, dispatch, formatUpdatedConversation],
  )
  return handleGetManyMessages
}
