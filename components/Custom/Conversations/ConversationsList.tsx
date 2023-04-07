import {
  Conversation,
  ConversationsState,
} from '@store/conversations/initialState'
import { Store } from '@store/index'
import { useSelector } from 'react-redux'
import ConversationItem from './ConversationItem'
import { useMemo } from 'react'

export default function ConversationsList() {
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const sortedConversations = useMemo(() => {
    return conversations
      .map((convo) => ({
        ...convo,
        latestMessage: {
          ...(convo.latestMessage || {}),
          createdAt: convo.latestMessage
            ? new Date(convo.latestMessage.createdAt)
            : undefined,
        },
      }))
      .sort((a, b) => {
        if (
          a.latestMessage &&
          a.latestMessage.createdAt &&
          b.latestMessage &&
          b.latestMessage.createdAt
        ) {
          return (
            b.latestMessage.createdAt.getTime() -
            a.latestMessage.createdAt.getTime()
          )
        } else {
          return 1
        }
      })
      .map((convo) => ({
        ...convo,
        latestMessage: convo.latestMessage
          ? {
              ...convo.latestMessage,
              createdAt: convo.latestMessage?.createdAt?.toTimeString(),
            }
          : convo.latestMessage,
      }))
  }, [conversations])

  return (
    <>
      {sortedConversations.map((conversation) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation as Conversation}
        />
      ))}
    </>
  )
}
