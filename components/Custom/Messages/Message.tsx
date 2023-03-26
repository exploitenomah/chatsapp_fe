import { Store } from '@store/index'
import { useSelector } from 'react-redux'
import CurrentUserMsg from './CurrentUser'
import OtherUserMsg from './OtherUser'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { User } from '@store/user/initialState'
import { Message } from '@store/messages/initialState'
import { UI } from '@store/ui/initialState'

const UnreadMessagesCountBanner = ({ show }: { show: boolean }) => {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const unreadMessagesCount = useMemo(() => {
    if (activeConversation && activeConversation.messages) {
      return activeConversation.messages.filter(
        (msg) => msg.seen === false && msg.sender !== authenticatedUser._id,
      ).length
    } else return 0
  }, [activeConversation, authenticatedUser._id])
  if (unreadMessagesCount === 0) return null
  return (
    <div
      className={`${
        show
          ? 'opacity-100 visible h-auto py-1 my-3 '
          : 'opacity-0 invisible h-0 m-0 py-0 '
      } transition-all duration-500 flex justify-center items-center w-full bg-primary-darkest/50`}
    >
      <div className='uppercase font-medium text-sm bg-primary-default px-4 py-2 rounded-full '>
        {unreadMessagesCount} unread
        {unreadMessagesCount > 1 ? <> messages </> : <> message</>}
      </div>
    </div>
  )
}

export const MainMessageWrapper = ({
  children,
  isConcurrentSender,
}: {
  children: ReactNode | ReactNode[]
  isConcurrentSender: boolean
}) => {
  const msgSeenRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={msgSeenRef}
      className={`w-full ${isConcurrentSender ? 'mb-[2px]' : 'mb-3'}`}
    >
      {children}
    </div>
  )
}

const MessageWrapperWithScrollIntoViewRef = ({
  children,
  shouldScrollIntoView,
  isNotSender,
  shouldShowUnreadBannerAbove,
}: {
  children: ReactNode | ReactNode[]
  shouldScrollIntoView: boolean
  isNotSender?: boolean
  shouldShowUnreadBannerAbove?: boolean
}) => {
  const msgRef = useRef<HTMLDivElement | null>(null)
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false)
  useEffect(() => {
    if (shouldScrollIntoView && !hasScrolledIntoView) {
      if (msgRef.current) {
        msgRef.current.scrollIntoView({
          block: 'start',
          inline: 'nearest',
        })
        setHasScrolledIntoView(true)
      }
    }
  }, [hasScrolledIntoView, shouldScrollIntoView])
  return (
    <div ref={msgRef}>
      <UnreadMessagesCountBanner
        show={shouldShowUnreadBannerAbove === true && isNotSender === true}
      />
      {children}
    </div>
  )
}

export default function MessageComponent({
  message,
  scrollMessageIntoView,
  shouldShowUnreadBannerAbove,
}: {
  message: Message
  scrollMessageIntoView: boolean
  shouldShowUnreadBannerAbove: boolean
}) {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const isNotSender = useMemo(
    () => authenticatedUser._id !== message.sender,
    [authenticatedUser._id, message.sender],
  )
  if (message.sender === authenticatedUser._id)
    return (
      <MessageWrapperWithScrollIntoViewRef
        isNotSender={isNotSender}
        shouldScrollIntoView={scrollMessageIntoView}
        shouldShowUnreadBannerAbove={shouldShowUnreadBannerAbove}
      >
        <CurrentUserMsg message={message} />
      </MessageWrapperWithScrollIntoViewRef>
    )
  return (
    <MessageWrapperWithScrollIntoViewRef
      isNotSender={isNotSender}
      shouldScrollIntoView={scrollMessageIntoView}
      shouldShowUnreadBannerAbove={shouldShowUnreadBannerAbove}
    >
      <OtherUserMsg message={message} />
    </MessageWrapperWithScrollIntoViewRef>
  )
}
