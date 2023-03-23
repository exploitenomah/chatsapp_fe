import ChatroomHeader from '@components/Custom/Conversations/ConversationHeader'
import useEmitGetManyMessages from '@hooks/messages/useEmitGetManyMessages'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MessageInput from '../MessageInput'
import MessagesList from '../Messages/MessagesList'

export default function ChatRoom() {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)

  const handleEmitGetManyMessages = useEmitGetManyMessages()

  useEffect(() => {
    if (activeConversation && !activeConversation?.hasFetchedInitialMessages) {
      handleEmitGetManyMessages(activeConversation._id)
    }
  }, [activeConversation, handleEmitGetManyMessages])

  return (
    <div className='relative h-full'>
      <div className='bg-doodle absolute z-[1] top-0 left-0 w-full h-full' />
      <div className='bg-primary-darkest absolute z-[0] top-0 left-0 w-full h-full' />
      <div className='relative z-[2] bg-transparent'>
        <ChatroomHeader />
      </div>
      <div className='absolute w-full z-[2] bg-transparent h-[88%] overflow-auto'>
        <MessagesList />
      </div>
      <footer className='absolute w-full z-[2] bottom-0'>
        <MessageInput />
      </footer>
    </div>
  )
}
