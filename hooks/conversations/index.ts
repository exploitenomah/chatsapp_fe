import {
  Conversation,
  ConversationsState,
} from '@store/conversations/initialState'
import { Store } from '@store/index'
import { Message } from '@store/messages/initialState'
import { User } from '@store/user/initialState'
import { isSubString } from '@utils/index'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useSearchConversations = () => {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  return useMemo(() => {
    if (!searchText || searchText.length === 0) return conversations
    else
      return conversations.filter((conversation) => {
        const otherUser = conversation.participants.find(
          (user) => user._id !== authenticatedUser._id,
        )
        const latestMessageText = conversation.latestMessage?.text

        return (
          latestMessageText?.toLowerCase().includes(searchText.toLowerCase()) ||
          (otherUser &&
            (isSubString(otherUser.firstName, searchText) ||
              isSubString(otherUser.lastName, searchText) ||
              isSubString(
                `${otherUser.firstName} ${otherUser.lastName}`,
                searchText,
              ) ||
              isSubString(otherUser.nickName, searchText)))
        )
      })
  }, [authenticatedUser._id, conversations, searchText])
}

export const useGetSearchedMessagesToDisplay = () => {
  const { searchedMessages, searchText } = useSelector<
    Store,
    ConversationsState
  >((store) => store.conversations)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)

  return useMemo(() => {
    return searchedMessages.filter(
      (msg) =>
        msg.text?.toLowerCase().includes(searchText?.toLowerCase() || '') ||
        (msg.sender._id !== authenticatedUser._id &&
          (isSubString(msg.sender.firstName, searchText || '') ||
            isSubString(msg.sender.lastName, searchText || '') ||
            isSubString(
              `${msg.sender.firstName} ${msg.sender.lastName}`,
              searchText || '',
            ) ||
            isSubString(msg.sender.nickName, searchText || ''))),
    )
  }, [authenticatedUser, searchText, searchedMessages])
}

export const useGetSortedConversations = (
  conversations: Conversation[],
  newestFirst = true,
) => {
  return useMemo(() => {
    return conversations
      .map((convo) => ({
        ...convo,
        latestMessage: {
          ...(convo.latestMessage || {}),
          createdAt:
            convo.latestMessage?.createdAt !== undefined
              ? new Date(convo.latestMessage.createdAt)
              : undefined,
        },
      }))
      .sort((a, b) => {
        if (newestFirst) {
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
        } else {
          if (
            a.latestMessage &&
            a.latestMessage.createdAt &&
            b.latestMessage &&
            b.latestMessage.createdAt
          ) {
            return (
              a.latestMessage.createdAt.getTime() -
              b.latestMessage.createdAt.getTime()
            )
          } else {
            return 1
          }
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
  }, [conversations, newestFirst])
}
