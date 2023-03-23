import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import MessageComponent, { MessageWrapper } from './Message'

export default function MessagesList() {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)

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
      // .map(msg=> ({...msg, createdAt: msg.createdAt.toDateString()}))
    }
  }, [activeConversation])

  return (
    <div className='w-full text-sm py-6'>
      <div className='flex flex-col'>
        {messages.map((message, idx, arr) => (
          <MessageWrapper
            isConcurrentSender={message.sender === arr[idx + 1]?.sender}
            key={message._id}
          >
            <MessageComponent message={message} />
          </MessageWrapper>
        ))}
      </div>
    </div>
  )
}
