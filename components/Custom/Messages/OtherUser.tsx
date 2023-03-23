import MessageTailIn from '@assets/MessageTailIn'
import { Message } from '@store/messages/initialState'

export default function OtherUserMsg({ message }: { message: Message }) {
  return (
    <div className='px-16 flex justify-start'>
      <div className='pt-1.5 pb-2.5 px-2 rounded-bl-lg rounded-br-lg rounded-tr-lg w-fit max-w-[75%] relative font-sm leading-5 text-contrast-strong bg-secondary-default flex'>
        <div className='absolute top-0 -left-2 text-secondary-default'>
          <MessageTailIn />
        </div>
        <div className='whitespace-pre-wrap'>
          <span>{message.text}</span>
        </div>
        <div className='self-end ml-1'>
          <div className='self-end ml-1 -mb-1.5 whitespace-nowrap text-[11px] text-contrast-primary/70'>
            {new Date(message.createdAt).toLocaleTimeString().slice(0, 5)}
          </div>
        </div>
      </div>
    </div>
  )
}
