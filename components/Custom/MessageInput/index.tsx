import { SendIcon, EmojiIcon, FileInputIcon } from '@assets/index'
import Button from '@components/HTML/Button'
import useSendMessage from '@hooks/messages/useSendMessage'
import { Store } from '@store/index'
import { Message } from '@store/messages/initialState'
import { UI } from '@store/ui/initialState'
import { User } from '@store/user/initialState'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import TextInput from './TextInput'

export default function MessageInput() {
  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const [message, setMessage] = useState({
    text: '',
    attachments: [],
  })

  const user = useSelector<Store, User>((store) => store.user)
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)

  const handleSendMessage = useSendMessage()

  const sendMessage = useCallback(() => {
    if (message.text.trim().length === 0 && message.attachments.length === 0) {
      setMessage((prev) => ({ ...prev, text: '' }))
      return
    }

    if (activeConversation) {
      handleSendMessage(activeConversation, { ...message, sender: user._id })
      setMessage((prev) => ({ ...prev, text: '' }))
      return
    }
  }, [activeConversation, handleSendMessage, message, user._id])

  return (
    <div className='py-1 pr-[17px] pl-[10px] flex items-end border-l border-l-contrast-secondary/20 bg-secondary-default'>
      <div className='flex items-center px-2.5 py-1 text-contrast-secondary/90'>
        <Button className='p-0 mr-2'>
          <EmojiIcon />
        </Button>
        <Button className='p-2 shadow-none'>
          <FileInputIcon />
        </Button>
      </div>
      <div className={`flex w-full`}>
        <div className='px-3 py-[9px] my-1 mx-2 rounded-lg w-full bg-secondary-darkest'>
          <TextInput
            textInputRef={textInputRef}
            onChange={(value) => {
              setMessage((prev) => ({ ...prev, text: value }))
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.shiftKey === false) {
                e.preventDefault()
                sendMessage()
              } else return
            }}
            onFocus={(e) => console.log('focused', e.target.selectionStart)}
            value={message.text}
          />
        </div>
        <Button className='pt-1 pb-3.5 px-2.5 self-end text-contrast-secondary/90'>
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}
