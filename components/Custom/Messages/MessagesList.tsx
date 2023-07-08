import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useSelector } from 'react-redux'
import { Fragment, useCallback, useMemo } from 'react'
import MessageComponent, { MainMessageWrapper } from './Message'
import { User } from '@store/user/initialState'
import { Message } from '@store/messages/initialState'
import Loader from '@assets/Loader'
import AuthLoader from '../Auth/AuthComponents'
import { formatDateTime } from "@hooks/conversations"

const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce((acc: { [x: string]: Message[] }, msg) => {
    let formattedDateKey = formatDateTime(msg.createdAt)
    if (acc[formattedDateKey])
      return { ...acc, [formattedDateKey]: [...acc[formattedDateKey], msg] }
    return { ...acc, [formattedDateKey]: [msg] }
  }, {})
}

const MessageGroupHeader = ({ date }: { date: string }) => {
  return (
    <>
      <div>
        <div className='mx-auto my-4 md:my-0 max-w-fit px-4 py-2 uppercase text-contrast-default bg-primary-light/50 rounded-lg'>
          {date}
        </div>
      </div>
    </>
  )
}

export default function MessagesList() {
  const { activeConversation, idOfMsgClickedFromSearch } = useSelector<
    Store,
    UI
  >((store) => store.ui)
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

  const messagesGroupedByDate = useMemo(
    () => groupMessagesByDate(messages),
    [messages],
  )

  const datesOfMessages = useMemo(
    () => Object.keys(messagesGroupedByDate),
    [messagesGroupedByDate],
  )

  // if (datesOfMessages.length === 0) return null

  if (
    activeConversation &&
    activeConversation.hasFetchedInitialMessages === false
  )
    return <AuthLoader />
  return (
    <>
      {datesOfMessages.map((date) => (
        <Fragment key={date}>
          <MessageGroupHeader date={date} />
          {messagesGroupedByDate[date].map((message, idx, arr) => (
            <MainMessageWrapper
              isConcurrentSender={
                message.sender === arr[idx + 1]?.sender ||
                idx === arr.length - 1
              }
              key={message._id}
            >
              <MessageComponent
                message={message}
                scrollMessageIntoView={
                  idOfMsgClickedFromSearch.length > 0
                    ? idOfMsgClickedFromSearch === message._id
                    : getIfShouldScrollMessageIntoView(message, idx, arr)
                }
                shouldHighlight={idOfMsgClickedFromSearch === message._id}
                shouldShowUnreadBannerAbove={getShouldShowUnreadBannerAbove(
                  message,
                  idx,
                  arr,
                )}
              />
            </MainMessageWrapper>
          ))}
        </Fragment>
      ))}
    </>
  )
}
