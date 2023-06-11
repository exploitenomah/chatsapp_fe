import { Store } from '@store/index'
import useBlockings from '@sockets/useBlockings'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Conversation,
  ConversationsState,
} from '@store/conversations/initialState'
import { User } from '@store/user/initialState'
import { updateSingleConversation } from '@store/conversations/slice'
import { UI } from '@store/ui/initialState'
import { updateActiveConversation } from '@store/ui/slice'
import { Socket } from 'socket.io-client'

const useHandleBlockingData = () => {
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const dispatch = useDispatch()
  const stringifyConversationsParticipants = useCallback(
    (convo: Conversation) => ({
      ...convo,
      participants: convo.participants.reduce(
        (acc, curr) => JSON.stringify(curr) + acc,
        '',
      ),
    }),
    [],
  )

  const handleBlockingData = useCallback(
    (data: { blocker: string; blockee: string; _id: string }) => {
      const convoWithStringifiedParticipants = conversations.map(
        stringifyConversationsParticipants,
      )

      let convoToUpdate = undefined
      let searchKey: string
      let userIsBlocker: boolean = true
      if (authenticatedUser._id === data.blocker) searchKey = data.blockee
      else {
        searchKey = data.blocker
        userIsBlocker = false
      }
      convoToUpdate = searchKey
        ? convoWithStringifiedParticipants.find((convo) =>
            convo.participants.includes(searchKey),
          )
        : undefined
      if (convoToUpdate) {
        const updConvo = {
          blocking: data,
          hasBlocking: true,
          isBlocker: userIsBlocker,
        }
        dispatch(
          updateSingleConversation({
            conversationId: convoToUpdate._id,
            update: updConvo as Partial<Conversation>,
          }),
        )
        if (activeConversation?._id === convoToUpdate?._id) {
          dispatch(updateActiveConversation(updConvo))
        }
      }
    },
    [
      activeConversation?._id,
      authenticatedUser._id,
      conversations,
      dispatch,
      stringifyConversationsParticipants,
    ],
  )
  return handleBlockingData
}

export default function useHandleConversationsOnBlockingsEvents(
  blockingsSocket: Socket,
) {
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)

  const dispatch = useDispatch()
  const handleBlockingData = useHandleBlockingData()

  const handleUnblock = useCallback(
    (data: { unblocked: boolean; blockingId: string }) => {
      const convosWithStringifiedBlocking = conversations.map((convo) => ({
        ...convo,
        blocking: JSON.stringify(convo.blocking),
      }))

      const convoToUpdate = convosWithStringifiedBlocking.find((convo) =>
        convo.blocking?.includes(data.blockingId),
      )
      if (convoToUpdate) {
        const updConvo = {
          blocking: undefined,
          hasBlocking: false,
          isBlocker: false,
        }
        dispatch(
          updateSingleConversation({
            conversationId: convoToUpdate._id,
            update: updConvo as Partial<Conversation>,
          }),
        )
        if (activeConversation?._id === convoToUpdate?._id) {
          dispatch(updateActiveConversation(updConvo))
        }
      }
    },
    [activeConversation?._id, conversations, dispatch],
  )

  useEffect(() => {
    blockingsSocket.on('block', handleBlockingData)
    blockingsSocket.on(
      'getOne',
      (data?: { blocker: string; blockee: string; _id: string }) => {
        if (data) handleBlockingData(data)
      },
    )
    blockingsSocket.on('unblock', handleUnblock)
    return () => {
      blockingsSocket.off('block', () => {})
      blockingsSocket.off('getOne', () => {})
      blockingsSocket.off('unblock', () => {})
    }
  }, [blockingsSocket, handleBlockingData, handleUnblock])
  return
}
