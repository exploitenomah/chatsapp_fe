import {
  FocusEventHandler,
  KeyboardEventHandler,
  RefObject,
  useCallback,
} from 'react'

export default function TextInput({
  textInputRef,
  onChange,
  value,
  onFocus,
  onKeyDown,
}: {
  textInputRef: RefObject<HTMLTextAreaElement>
  onChange: (value: string) => void
  value: string | undefined
  onFocus?: FocusEventHandler<HTMLTextAreaElement>
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>
}) {
  const calcHeight = useCallback(function (value: string) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length
    let newHeight = 24 + numberOfLineBreaks * 20 + 0 + 0
    return newHeight
  }, [])

  const handleHeightChange = useCallback(() => {
    if (textInputRef.current !== null) {
      textInputRef.current.style.height =
        calcHeight(textInputRef.current.value) + 'px'
    }
  }, [textInputRef, calcHeight])

  return (
    <div className='flex items-center overflow-auto w-full max-h-[7.35em] bg-secondary-darkest border border-secondary-darkest'>
      <textarea
        placeholder='Type a message'
        onFocus={onFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyUpCapture={() => handleHeightChange()}
        onKeyDown={(e) => onKeyDown(e)}
        ref={textInputRef}
        value={value}
        className='resize-none overflow-hidden h-[24px] max-h-[112] w-full focus:outline-0 leading-5 bg-transparent transition-all duration-75'
      ></textarea>
    </div>
  )
}
