import useHandleMessageButtonClick from '@hooks/conversations/useHandleMessageButtonClick'
import { Conversation } from '@store/conversations/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { User } from '@store/user/initialState'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar'

export default function ConversationItem({
  conversation,
}: {
  conversation: Conversation
}) {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)

  const otherUser = useMemo(
    () =>
      conversation.participants.find(
        (user) => user._id !== authenticatedUser._id,
      ),
    [authenticatedUser, conversation.participants],
  )

  const handleMessageButtonClick = useHandleMessageButtonClick(
    conversation.participants.map((el) => el._id),
  )

  const handleOnClick = useCallback(() => {
    if (activeConversation?._id === conversation._id) return
    handleMessageButtonClick()
  }, [activeConversation?._id, conversation._id, handleMessageButtonClick])

  return (
    <div
      onClick={handleOnClick}
      className={`w-full h-[72px] flex items-center ${
        activeConversation?._id === conversation._id
          ? 'bg-secondary-darkest'
          : 'bg-primary-default hover:bg-secondary-default '
      }`}
    >
      <div className='cursor-pointer flex items-center pr-[6px] w-full'>
        <div className='px-[15px] flex justify-center items-center shrink-0'>
          <Avatar width={49} height={49} />
        </div>
        <div className='h-[72px] basis-auto flex grow flex-col justify-center items-start border-b border-b-contrast-secondary/20'>
          <div className='text-contrast-strong text-base'>
            {otherUser?.nickName}
          </div>
          <div className='text-contrast-secondary text-sm font-normal whitespace-nowrap flex relative w-full h-[20px]'>
            <span className='absolute w-full text-ellipsis overflow-hidden'>
              {conversation.latestMessage?.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
