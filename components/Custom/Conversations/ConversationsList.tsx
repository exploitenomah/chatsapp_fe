import {
  Conversation,
  ConversationsState,
} from '@store/conversations/initialState'
import { Store } from '@store/index'
import { useDispatch, useSelector } from 'react-redux'
import ConversationItem from './ConversationItem'
import { useMemo } from 'react'
import { User } from '@store/user/initialState'
import Button from '@components/HTML/Button'
import { toggleShowFriendsDrawer } from "@store/ui/slice"

export default function ConversationsList() {
  const dispatch = useDispatch()
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const conversationsToDisplay = useMemo(() => {
    if (!searchText || searchText.length === 0) return conversations
    else
      return conversations.filter((conversation) => {
        const otherUser = conversation.participants.find(
          (user) => user._id !== authenticatedUser._id,
        )
        const latestMessageText = conversation.latestMessage?.text

        return (
          latestMessageText?.toLowerCase().includes(searchText.toLowerCase()) ||
          otherUser?.firstName
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          otherUser?.lastName
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          otherUser?.nickName?.toLowerCase().includes(searchText.toLowerCase())
        )
      })
  }, [authenticatedUser._id, conversations, searchText])

  const sortedConversations = useMemo(() => {
    return conversationsToDisplay
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
              createdAt: convo.latestMessage?.createdAt?.toUTCString(),
            }
          : convo.latestMessage,
      }))
  }, [conversationsToDisplay])

  if (searchText && searchText.length > 0 && sortedConversations.length === 0)
    return (
      <div className='flex flex-col items-center my-4 mx-auto'>
        <p>No Chats Found</p>
        <Button
          onClick={() => {
            dispatch(toggleShowFriendsDrawer(true))
          }}
          className='flex flex-col items-center my-4 mx-auto bg-primary-light'
        >
          Search Chatsapp
        </Button>
      </div>
    )
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
