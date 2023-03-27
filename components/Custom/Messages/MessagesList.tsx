import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import MessageComponent, { MainMessageWrapper } from './Message'
import { User } from '@store/user/initialState'
import { Message } from '@store/messages/initialState'

export default function MessagesList() {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)

  const messages = useMemo(() => {
    if (!activeConversation || !Array.isArray(activeConversation.messages))
      return []
    else {
      return activeConversation.messages
        .map((msg) => ({
          ...msg,
          createdAt: new Date(msg.createdAt),
        }))
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    }
  }, [activeConversation])

  const getIfShouldScrollMessageIntoView = useCallback(
    (message: Message, idx: number, arr: Message[]) => {
      return (
        (idx === arr.length - 1 &&
          (message.sender === authenticatedUser._id ||
            (activeConversation?.shouldScrollMessages === true &&
              arr.every((msg: Message) => msg.seen === true)))) ||
        (idx === 0 && arr.every((msg: Message) => msg.seen === false)) ||
        (activeConversation?.shouldScrollMessages === true &&
          message.seen === false &&
          message.sender !== authenticatedUser._id &&
          (arr[idx - 1]?.seen === true ||
            arr[idx - 1]?.sender === authenticatedUser._id)) ||
        (activeConversation?.shouldScrollMessages === true &&
          idx === arr.length - 1 &&
          message.seen === true)
      )
    },
    [activeConversation?.shouldScrollMessages, authenticatedUser._id],
  )

  const getShouldShowUnreadBannerAbove = useCallback(
    (message: Message, idx: number, arr: Message[]) => {
      return (
        message.seen === false &&
        message.sender !== authenticatedUser._id &&
        arr[idx - 1]?.seen === true
      )
    },
    [authenticatedUser._id],
  )

  if (messages.length === 0) return null
  return (
    <>
      {messages.map((message, idx, arr) => (
        <MainMessageWrapper
          isConcurrentSender={
            message.sender === arr[idx + 1]?.sender || idx === arr.length - 1
          }
          key={message._id}
        >
          <MessageComponent
            message={message}
            scrollMessageIntoView={getIfShouldScrollMessageIntoView(
              message,
              idx,
              arr,
            )}
            shouldShowUnreadBannerAbove={getShouldShowUnreadBannerAbove(
              message,
              idx,
              arr,
            )}
          />
        </MainMessageWrapper>
      ))}
    </>
  )
}
