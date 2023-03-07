import { SendIcon, EmojiIcon, FileInputIcon } from '@assets/index'
import Button from '@components/HTML/Button'
import { useCallback, useEffect, useRef, useState } from 'react'
import TextInput from './TextInput'

export default function MessageInput() {
  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const [test, setTest] = useState('')

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
            onChange={function (value): void {
              setTest(value)
            }}
            onFocus={(e) => console.log('focused', e.target.selectionStart)}
            value={test}
          />
        </div>
        <Button className='pt-1 pb-3.5 px-2.5 self-end text-contrast-secondary/90'>
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}
