import { Conversation } from '@store/conversations/initialState'
import { User } from '@store/user/initialState'
import { isSubString } from '@utils/index'
import { useMemo } from 'react'

export const useSearchConversations = ({
  conversations,
  searchText,
  authenticatedUser,
}: {
  conversations: Conversation[]
  searchText: string
  authenticatedUser: User
}) => {
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
          createdAt: convo.latestMessage
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
