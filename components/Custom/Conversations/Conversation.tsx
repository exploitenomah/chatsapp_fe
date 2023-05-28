import ChevronIcon from '@assets/ChevronDownIcon'
import ConversationRoomHeader from '@components/Custom/Conversations/ConversationHeader'
import Button from '@components/HTML/Button'
import useEmitGetManyMessages from '@hooks/messages/useEmitGetManyMessages'
import useEmitMessagesSeen from '@hooks/messages/useEmitMessagesSeen'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { updateActiveConversation } from '@store/ui/slice'
import { User } from '@store/user/initialState'
import {
  UIEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Badge from '../Badge'
import MessageInput from '../MessageInput'
import MessagesList from '../Messages/MessagesList'
import AuthLoader from '../Auth/AuthComponents'

const MessagesListContainer = () => {
  const handleEmitMessagesSeen = useEmitMessagesSeen()
  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(false)
  const msgsContainerRef = useRef<HTMLDivElement | null>(null)
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const unseenMsgs = useMemo(
    () =>
      activeConversation?.messages?.filter(
        (msg) => msg.sender !== authenticatedUser._id && msg.seen === false,
      ),
    [activeConversation?.messages, authenticatedUser._id],
  )
  const handleGetManyMessages = useEmitGetManyMessages()
  const dispatch = useDispatch()

  const handleScrollToBottomClick = useCallback(() => {
    const lastElementChild = msgsContainerRef.current?.lastElementChild
    if (lastElementChild) {
      lastElementChild.scrollIntoView({
        block: 'start',
        inline: 'nearest',
      })
    }
  }, [msgsContainerRef])

  const updateSeenMessages = useCallback(() => {
    return setTimeout(() => {
      if (activeConversation?.messages) {
        const unseenMessage = activeConversation.messages.find(
          (msg) => msg.seen === false && msg.sender !== authenticatedUser._id,
        )
        if (unseenMessage) {
          handleEmitMessagesSeen(
            unseenMessage.conversationId,
            activeConversation.participants.map((el) => el._id),
          )
        }
      }
    }, 3000)
  }, [
    activeConversation?.messages,
    activeConversation?.participants,
    authenticatedUser._id,
    handleEmitMessagesSeen,
  ])

  const handleScrollToBottom = useCallback(
    (scrollEventTarget: HTMLDivElement) => {
      const isElementBottomReached =
        scrollEventTarget.scrollHeight - scrollEventTarget.scrollTop ===
        scrollEventTarget.clientHeight
      setShowScrollToBottomButton(
        scrollEventTarget.scrollHeight -
          scrollEventTarget.scrollTop -
          scrollEventTarget.clientHeight >
          40,
      )
      if (isElementBottomReached) {
        activeConversation &&
          activeConversation.shouldScrollMessages === true &&
          dispatch(
            updateActiveConversation({
              ...activeConversation,
              shouldScrollMessages: false,
            }),
          )
      }
    },
    [activeConversation, dispatch],
  )

  const handleFetchMessagesOnScroll = useCallback(
    (scrollEventTarget: HTMLDivElement) => {
      if (
        scrollEventTarget.scrollTop <= 1000 &&
        activeConversation?.hasFetchedAllMessages === false
      ) {
        handleGetManyMessages(
          activeConversation._id,
          activeConversation.messagesPage,
        )
      }
    },
    [
      activeConversation?._id,
      activeConversation?.hasFetchedAllMessages,
      activeConversation?.messagesPage,
      handleGetManyMessages,
    ],
  )

  const handleMsgContainerScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (scrollEvent) => {
      const scrollEventTarget = scrollEvent.target as HTMLDivElement
      if (activeConversation !== null) {
        handleScrollToBottom(scrollEventTarget)
        handleFetchMessagesOnScroll(scrollEventTarget)
      }
    },
    [activeConversation, handleScrollToBottom, handleFetchMessagesOnScroll],
  )

  useEffect(() => {
    const msgsSeenTimeout = !showScrollToBottomButton
      ? updateSeenMessages()
      : undefined
    return () => {
      clearTimeout(msgsSeenTimeout)
    }
  }, [showScrollToBottomButton, updateSeenMessages])

  return (
    <div className='absolute z-[2] w-full h-[88%] '>
      <div
        ref={msgsContainerRef}
        onScroll={handleMsgContainerScroll}
        className='absolute z-[2] bg-transparent h-full overflow-auto flex flex-col w-full text-sm md:pt-6 pb-8'
      >
        <MessagesList />
      </div>

      <div
        className={`${
          showScrollToBottomButton ? 'scale-100' : 'scale-0'
        } absolute z-[3] right-[11px] bottom-[17px] w-fit duration-150 transition-all origin-top`}
      >
        <Button
          className={`bg-primary-light rounded-full w-[42px] h-[42px] p-0 flex justify-center items-center`}
          onClick={() => handleScrollToBottomClick()}
        >
          <ChevronIcon />
          {unseenMsgs?.length! > 0 && (
            <span className='block absolute w-[19.19px] h-[19.19px] -top-2 -left-1'>
              <Badge>{unseenMsgs?.length}</Badge>
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

const ConversationRoomFooter = ({ otherUser }: { otherUser?: User }) => {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const isBlocker = useMemo(() => {
    if (activeConversation)
      return activeConversation.hasBlocking && activeConversation.isBlocker
    else return false
  }, [activeConversation])
  return (
    <>
      <footer className='absolute w-full z-[2] bottom-0'>
        {!isBlocker ? (
          <>
            {!activeConversation?.hasFetchedInitialMessages && <AuthLoader />}
            <MessageInput
              focus={activeConversation?.hasFetchedInitialMessages}
            />
          </>
        ) : (
          <div className='bg-secondary-default px-4 py-5 text-sm text-center text-contrast-secondary'>
            Can&apos;t send a message to blocked user {otherUser?.nickName}
          </div>
        )}
      </footer>
    </>
  )
}

export default function ConversationRoom() {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const otherUser = useMemo(
    () =>
      activeConversation?.participants.find(
        (user) => user._id !== authenticatedUser._id,
      ),
    [activeConversation?.participants, authenticatedUser._id],
  )

  const handleEmitGetManyMessages = useEmitGetManyMessages()

  useEffect(() => {
    if (
      activeConversation &&
      activeConversation?.hasFetchedInitialMessages === false
    ) {
      handleEmitGetManyMessages(activeConversation._id)
    }
  }, [activeConversation, handleEmitGetManyMessages])

  return (
    <div className='relative h-full'>
      <div className='bg-doodle absolute z-[1] top-0 left-0 w-full h-full' />
      <div className='bg-primary-darkest absolute z-[0] top-0 left-0 w-full h-full' />
      <div className='relative z-[3] bg-transparent'>
        <ConversationRoomHeader otherUser={otherUser} />
      </div>
      <MessagesListContainer />
      <ConversationRoomFooter otherUser={otherUser} />
    </div>
  )
}
