import { Store } from '@store/index'
import useConversations from '@sockets/useConversations'
import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useEmitter from '../useEmitters'
import {
  Conversation,
  conversationsEvents,
  ConversationsState,
} from '@store/conversations/initialState'
import { bothArraysContainTheSameStringValues } from '@utils/index'
import { setActiveConversation } from '@store/ui/slice'

export default function useCreateConversation(participants: string[]) {
  const conversationsSocket = useConversations()
  const conversationsSocketEmitters = useEmitter(
    conversationsSocket,
    conversationsEvents,
  )
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const dispatch = useDispatch()

  const checkIfConversationExistsInState = useCallback(() => {
    const existingConversationInState = conversations.find((conversation) =>
      bothArraysContainTheSameStringValues(
        conversation.participants.map((el) => el._id),
        participants,
      ),
    )
    return existingConversationInState
  }, [conversations, participants])

  const handleCreateConversation = useCallback(() => {
    conversationsSocketEmitters.new({ participants })
  }, [conversationsSocketEmitters, participants])

  useEffect(() => {
    conversationsSocket.on('new', (data: Conversation) => {
      const isJustCreated = bothArraysContainTheSameStringValues(
        data.participants.map((el) => el._id),
        participants,
      )
      if (isJustCreated)
        dispatch(
          setActiveConversation({
            ...data,
            messages: data.messages || [],
          }),
        )
    })
    return () => {
      conversationsSocket.off('new', () => {})
    }
  }, [conversationsSocket, dispatch, participants])
  return { handleCreateConversation, checkIfConversationExistsInState }
}
