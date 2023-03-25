import ChatroomHeader from '@components/Custom/Conversations/ConversationHeader'
import useEmitGetManyMessages from '@hooks/messages/useEmitGetManyMessages'
import useEmitUpdateMessages from '@hooks/messages/useEmitUpdateMessage'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { User } from '@store/user/initialState'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MessageInput from '../MessageInput'
import MessagesList from '../Messages/MessagesList'

export default function ChatRoom() {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)

  const handleEmitGetManyMessages = useEmitGetManyMessages()
  const handleUpdateMessagesSeen = useEmitUpdateMessages()

  useEffect(() => {
    if (
      activeConversation &&
      activeConversation?.hasFetchedInitialMessages === false
    ) {
      handleEmitGetManyMessages(activeConversation._id)
    }
  }, [activeConversation, handleEmitGetManyMessages])

  useEffect(() => {
    const updateSeenInterval = setInterval(() => {
      if (activeConversation?.messages) {
        const unseenMessage = activeConversation.messages.find(
          (msg) => msg.seen === false && msg.sender !== authenticatedUser._id,
        )
        if (unseenMessage) {
          handleUpdateMessagesSeen(
            unseenMessage.conversationId,
            activeConversation.participants.map((el) => el._id),
          )
        }
      }
    }, 3000)

    return () => {
      clearInterval(updateSeenInterval)
    }
  }, [activeConversation, authenticatedUser._id, handleUpdateMessagesSeen])

  return (
    <div className='relative h-full'>
      <div className='bg-doodle absolute z-[1] top-0 left-0 w-full h-full' />
      <div className='bg-primary-darkest absolute z-[0] top-0 left-0 w-full h-full' />
      <div className='relative z-[2] bg-transparent'>
        <ChatroomHeader />
      </div>
      <div className='absolute z-[2] bg-transparent h-[88%] overflow-auto flex flex-col w-full text-sm py-6'>
        <MessagesList />
      </div>
      <footer className='absolute w-full z-[2] bottom-0'>
        <MessageInput />
      </footer>
    </div>
  )
}
