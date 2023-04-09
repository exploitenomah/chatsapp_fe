import { Store } from '@store/index'
import { useSelector } from 'react-redux'
import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { User } from '@store/user/initialState'
import { Message } from '@store/messages/initialState'
import { UI } from '@store/ui/initialState'
import SingleCheckIcon from '@assets/SingleCheckIcon'
import DoubleCheckIcon from '@assets/DoubleCheckIcon'
import MessageTailIn from '@assets/MessageTailIn'
import MessageTailOut from '@assets/MessageTailOut'

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
  return (
    <div className={`w-full ${isConcurrentSender ? 'mb-[2px]' : 'mb-3'}`}>
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

const StyledMessageComponent = ({
  message,
  MessageTail,
  isOtherUser,
}: {
  message: Message
  MessageTail: ({}: HTMLAttributes<SVGElement>) => JSX.Element
  isOtherUser: boolean
}) => {
  return (
    <>
      <div
        className={`px-8 md:px-16 min-w-full flex ${
          isOtherUser ? 'justify-start' : 'justify-end'
        }`}
      >
        <div
          className={`flex pt-1.5 pb-2.5 px-2 relative font-sm leading-5 rounded-bl-lg rounded-br-lg w-fit max-w-[75%]  ${
            isOtherUser
              ? 'rounded-tr-lg text-contrast-strong bg-secondary-default'
              : 'rounded-tl-lg text-contrast-strong bg-accent-default'
          }`}
        >
          <div
            className={`absolute top-0 ${
              isOtherUser
                ? '-left-2 text-secondary-default'
                : '-right-2 text-accent-default'
            } `}
          >
            <MessageTail />
          </div>
          <div className='whitespace-pre-wrap break-all'>
            <span>{message.text}</span>
          </div>
          <div className='self-end ml-1 flex items-center gap-x-[2px] text-[11px] h-[15px]'>
            <div className='ml-1 -mb-1.5 whitespace-nowrap text-contrast-primary/80'>
              {new Date(message.createdAt).toLocaleTimeString().slice(0, 5)}
            </div>
            <span className='text-contrast-strong/50 pt-[6px]'>
              {message.delivered === false &&
                message.seen === false &&
                !isOtherUser && <SingleCheckIcon />}
              {message.delivered === true && !isOtherUser && (
                <DoubleCheckIcon
                  className={message.seen ? 'text-[#53bdeb]' : ''}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
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
        <StyledMessageComponent
          message={message}
          MessageTail={MessageTailOut}
          isOtherUser={false}
        />
      </MessageWrapperWithScrollIntoViewRef>
    )
  return (
    <MessageWrapperWithScrollIntoViewRef
      isNotSender={isNotSender}
      shouldScrollIntoView={scrollMessageIntoView}
      shouldShowUnreadBannerAbove={shouldShowUnreadBannerAbove}
    >
      <StyledMessageComponent
        message={message}
        MessageTail={MessageTailIn}
        isOtherUser={true}
      />
    </MessageWrapperWithScrollIntoViewRef>
  )
}
