import DoubleCheckIcon from '@assets/DoubleCheckIcon'
import SingleCheckIcon from '@assets/SingleCheckIcon'
import useHandleMessageButtonClick from '@hooks/conversations/useHandleMessageButtonClick'
import useManageConversation from '@hooks/conversations/useManageConversations'
import useEmitMessagesDelivered from '@hooks/messages/useEmitMessagesDelivered'
import { Conversation } from '@store/conversations/initialState'
import { Store } from '@store/index'
import { Message } from '@store/messages/initialState'
import { UI } from '@store/ui/initialState'
import { User } from '@store/user/initialState'
import { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar'
import Badge from '../Badge'
import useEmitUnSeenMsgsCount from '@hooks/conversations/useEmitUnseenMsgsCount'
import { updateSingleConversation } from '@store/conversations/slice'

const LatestMessage = ({
  latestMessage,
  otherUser,
}: {
  latestMessage?: Message
  otherUser?: User
}) => {
  if (!latestMessage || !otherUser) return null
  return (
    <>
      <span
        title={latestMessage.text}
        className='absolute w-full text-ellipsis overflow-hidden flex items-center gap-x-[3px]'
      >
        {otherUser._id === latestMessage.sender ? null : (
          <>
            <span className='text-contrast-strong/50'>
              {latestMessage.delivered === false &&
                latestMessage.seen === false &&
                otherUser._id !== latestMessage.sender && <SingleCheckIcon />}
              {latestMessage.delivered === true && (
                <DoubleCheckIcon
                  className={latestMessage.seen ? 'text-[#53bdeb]' : ''}
                />
              )}
            </span>
          </>
        )}
        {latestMessage.text}
      </span>
    </>
  )
}

export default function ConversationItem({
  conversation,
}: {
  conversation: Conversation
}) {
  useManageConversation(conversation)
  useEmitUnSeenMsgsCount(conversation._id)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const dispatch = useDispatch()
  const isActive = useMemo(
    () => activeConversation?._id === conversation._id,
    [activeConversation?._id, conversation._id],
  )
  const otherUser = useMemo(
    () =>
      conversation.participants.find(
        (user) => user._id !== authenticatedUser._id,
      ),
    [authenticatedUser, conversation.participants],
  )

  const unseenMessages = useMemo(() => {
    return conversation.messages
      ? conversation.messages.filter(
          (msg) => msg.seen === false && msg.sender !== authenticatedUser._id,
        )
      : []
  }, [authenticatedUser._id, conversation.messages])
  const unSeenMsgsCount = useMemo(() => {
    return (conversation.unSeenMsgsCount || 0) + unseenMessages.length
  }, [conversation.unSeenMsgsCount, unseenMessages.length])

  const showUnseenMsgsBadge = useMemo(
    () =>
      !conversation.hasFetchedInitialMessages && conversation.unSeenMsgsCount
        ? true
        : unseenMessages.length > 0 &&
          activeConversation?._id !== conversation._id,
    [
      activeConversation?._id,
      conversation._id,
      conversation.hasFetchedInitialMessages,
      conversation.unSeenMsgsCount,
      unseenMessages.length,
    ],
  )

  const timeOfLastSentMsg = useMemo(() => {
    let timeStringToBeReturned
    let latestMsgCreatedAt = conversation.latestMessage?.createdAt
    if (latestMsgCreatedAt) {
      latestMsgCreatedAt = new Date(latestMsgCreatedAt)
      const today = new Date(Date.now())
      const thisYear = today.getFullYear()
      const thisMonth = today.getMonth()
      const thisDate = today.getDate()
      const yearOfLatestMsg = latestMsgCreatedAt.getFullYear()
      const monthOfLatestMsg = latestMsgCreatedAt.getMonth()
      const dateOfLatestMsg = latestMsgCreatedAt.getDate()

      if (yearOfLatestMsg === thisYear || monthOfLatestMsg === thisMonth) {
        let dateDifference = thisDate - dateOfLatestMsg
        if (dateDifference < 1)
          timeStringToBeReturned = latestMsgCreatedAt
            .toLocaleTimeString()
            .slice(0, 5)
        else if (dateDifference < 2) timeStringToBeReturned = 'Yesterday'
        else if (dateDifference < 7)
          timeStringToBeReturned = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
          }).format(latestMsgCreatedAt)
        else
          timeStringToBeReturned =
            latestMsgCreatedAt.toLocaleDateString('en-GB')
      } else
        timeStringToBeReturned = latestMsgCreatedAt.toLocaleDateString('en-GB')
      return timeStringToBeReturned
    } else return null
  }, [conversation.latestMessage?.createdAt])

  const handleMessageButtonClick = useHandleMessageButtonClick(
    conversation.participants.map((el) => el._id),
  )

  const handleOnClick = useCallback(() => {
    if (activeConversation?._id === conversation._id) return
    handleMessageButtonClick()
    dispatch(
      updateSingleConversation({
        conversationId: conversation._id,
        update: {
          ...conversation,
          unSeenMsgsCount: 0,
        },
      }),
    )
  }, [
    activeConversation?._id,
    conversation,
    dispatch,
    handleMessageButtonClick,
  ])

  const handleEmitMessagesDelivered = useEmitMessagesDelivered()

  useEffect(() => {
    const undeliveredMessage = conversation.messages?.find(
      (msg) => msg.sender !== authenticatedUser._id && msg.delivered === false,
    )
    if (undeliveredMessage || conversation.unSeenMsgsCount) {
      handleEmitMessagesDelivered(
        conversation._id,
        conversation.participants.map((el) => el._id),
      )
    }
  }, [
    authenticatedUser._id,
    conversation._id,
    conversation.messages,
    conversation.participants,
    conversation.unSeenMsgsCount,
    handleEmitMessagesDelivered,
  ])

  return (
    <div
      onClick={handleOnClick}
      className={`w-full h-[72px] flex items-center ${
        isActive
          ? 'bg-secondary-darkest'
          : 'bg-primary-default hover:bg-secondary-default '
      }`}
    >
      <div className='cursor-pointer flex items-center pr-[6px] w-full'>
        <div className='px-[15px] flex justify-center items-center shrink-0'>
          <Avatar
            width={49}
            height={49}
            src={otherUser?.profileImage?.path || ''}
            alt={otherUser?.nickName || ''}
          />
        </div>
        <div className='h-[72px] grow  flex items-center border-b border-b-contrast-secondary/20 pr-3'>
          <div className='basis-auto flex items-center grow'>
            <div className='grow'>
              <div className='text-contrast-strong text-base '>
                {otherUser?.nickName}
              </div>
              <div
                className={`${
                  isActive ? 'text-contrast-strong' : 'text-contrast-secondary'
                } text-[14px] font-normal whitespace-nowrap flex relative w-[90%] h-[20px]`}
              >
                <LatestMessage
                  otherUser={otherUser}
                  latestMessage={conversation?.latestMessage}
                />
              </div>
            </div>
            <div className='flex flex-col justify-center self-start'>
              <div
                className={`${
                  showUnseenMsgsBadge
                    ? 'text-accent-dark font-bold'
                    : 'text-contrast-secondary/95'
                } text-xs self-start`}
              >
                {timeOfLastSentMsg}
              </div>
              {showUnseenMsgsBadge ? (
                <div className='relative w-[19.19px] h-[19.19px] mt-[2px] ml-auto'>
                  <Badge>
                    {unSeenMsgsCount < 100 ? (
                      unSeenMsgsCount
                    ) : (
                      <span className='text-[9px]'>99+</span>
                    )}
                  </Badge>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
