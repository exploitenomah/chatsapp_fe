import useEmitter from '@hooks/useEmitters'
import useConversations from '@sockets/useConversations'
import {
  conversationsEvents,
  ConversationsState,
} from '@store/conversations/initialState'
import { Store } from '@store/index'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function useGetConversationsNotInState() {
  const { idsOfConversationsNotFetched, conversations } = useSelector<
    Store,
    ConversationsState
  >((store) => store.conversations)
  const conversationsSocket = useConversations()
  const conversationsSocketEmitters = useEmitter(
    conversationsSocket,
    conversationsEvents,
  )
  useEffect(() => {
    if (idsOfConversationsNotFetched.length > 0) {
      const conversationsNotInState = idsOfConversationsNotFetched.filter(
        (id) => !conversations.map((conv) => conv._id).includes(id),
      )
      if (conversationsNotInState.length > 0) {
        conversationsSocketEmitters.getMany({
          page: 1,
          limit: 100,
          or: conversationsNotInState.map((_id) => ({ _id })),
        })
      }
    }
  }, [conversations, conversationsSocketEmitters, idsOfConversationsNotFetched])
  return
}
