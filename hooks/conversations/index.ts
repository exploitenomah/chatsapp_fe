import {
  Conversation,
  ConversationsState,
} from '@store/conversations/initialState'
import { Store } from '@store/index'
import { User } from '@store/user/initialState'
import { isSubString } from '@utils/index'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const formatDateTime = (date: Date | string) => {
  const todaysDate = new Date(Date.now())
  const thisYear = todaysDate.getFullYear()
  const thisMonth = todaysDate.getMonth()
  const thisDay = todaysDate.getDate()
  let dateSent = new Date(date)
  let msgMonth = dateSent.getMonth()
  let msgYear = dateSent.getFullYear()
  let msgDay = dateSent.getDate()
  let formattedDate = dateSent.toLocaleDateString('en-GB')
  if (msgYear === thisYear && msgMonth === thisMonth) {
    let diffInDays = thisDay - msgDay
    if (msgDay === thisDay) formattedDate = 'Today'
    else if (Math.sign(diffInDays) === 1)
      if (diffInDays === 1) formattedDate = 'Yesterday'
      else if (diffInDays <= 7)
        formattedDate = dateSent.toLocaleString('en-GB', {
          weekday: 'long',
        })
  }
return formattedDate
}
export const useGetTimeOfMessageFormat = ({
  date,
}: {
  date: Date | string
}) => {
  return useMemo(() => {
    let timeStringToBeReturned
    let formattedResult = date
    if (!formattedResult) return null
    else {
      formattedResult = new Date(formattedResult)
      const today = new Date(Date.now())
      const thisYear = today.getFullYear()
      const thisMonth = today.getMonth()
      const thisDate = today.getDate()
      const yearOfLatestMsg = formattedResult.getFullYear()
      const monthOfLatestMsg = formattedResult.getMonth()
      const dateOfLatestMsg = formattedResult.getDate()

      if (yearOfLatestMsg === thisYear || monthOfLatestMsg === thisMonth) {
        let dateDifference = thisDate - dateOfLatestMsg
        if (dateDifference < 1)
          timeStringToBeReturned = formattedResult
            .toLocaleTimeString()
            .slice(0, 5)
        else if (dateDifference < 2) timeStringToBeReturned = 'Yesterday'
        else if (dateDifference < 7)
          timeStringToBeReturned = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
          }).format(formattedResult)
        else
          timeStringToBeReturned = formattedResult.toLocaleDateString('en-GB')
      } else
        timeStringToBeReturned = formattedResult.toLocaleDateString('en-GB')
      return timeStringToBeReturned
    }
  }, [date])
}
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
          latestMessageText
            ?.toLowerCase()
            .includes(searchText.toLowerCase().trim()) ||
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

export const useGetSearchedMessagesToDisplay = ({
  conversationId,
  searchText,
}: {
  conversationId?: string
  searchText: string
}) => {
  const { searchedMessages } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )

  return useMemo(() => {
    return searchedMessages.filter((msg) => {
      console.log(conversationId, msg.conversationId._id)
      if (conversationId) {
        return (
          msg.text
            ?.toLowerCase()
            .includes(searchText.toLowerCase().trim() || '') &&
          conversationId === msg.conversationId._id
        )
      } else {
        return msg.text
          ?.toLowerCase()
          .includes(searchText?.toLowerCase().trim() || '')
      }
    })
  }, [conversationId, searchText, searchedMessages])
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
