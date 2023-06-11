import { Store } from '@store/index'
import useBlockings from '@sockets/useBlockings'
import { useEffect } from 'react'
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
import { isUndefined } from 'util'

export default function useHandleConversationsOnBlockingsEvents(
  blockingsSocket: Socket,
) {
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    blockingsSocket.on(
      'block',
      (data: { blocker: string; blockee: string; _id: string }) => {
        const convoWithStringifiedParticipants = conversations.map((convo) => ({
          ...convo,
          participants: convo.participants.reduce(
            (acc, curr) => JSON.stringify(curr) + acc,
            '',
          ),
        }))

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
    )
    blockingsSocket.on(
      'getOne',
      (data?: { blocker: string; blockee: string; _id: string }) => {
        const convoWithStringifiedParticipants = conversations.map((convo) => ({
          ...convo,
          participants: convo.participants.reduce(
            (acc, curr) => JSON.stringify(curr) + acc,
            '',
          ),
        }))

        let convoToUpdate: Conversation | undefined
        let searchKey: string
        let userIsBlocker: boolean = true
        if (authenticatedUser._id === data?.blocker) searchKey = data?.blockee || ''
        else {
          searchKey = data?.blocker || ''
          userIsBlocker = false
        }
        if (searchKey)
          convoWithStringifiedParticipants.find((convo) =>
            convo.participants.includes(searchKey),
          )
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
    )
    blockingsSocket.on(
      'unblock',
      (data: { unblocked: boolean; blockingId: string }) => {
        const convoWithStringifiedBlocking = conversations.map((convo) => ({
          ...convo,
          blocking: JSON.stringify(convo.blocking),
        }))

        let convoToUpdate = undefined

        convoToUpdate = convoWithStringifiedBlocking.find((convo) =>
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
    )
    return () => {
      blockingsSocket.off('block', () => {})
      blockingsSocket.off('getOne', () => {})
      blockingsSocket.off('unblock', () => {})
    }
  }, [
    activeConversation?._id,
    authenticatedUser._id,
    blockingsSocket,
    conversations,
    dispatch,
  ])
  return
}
