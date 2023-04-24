import PencilIcon from '@assets/PencilIcon'
import SingleCheckIcon from '@assets/SingleCheckIcon'
import Button from '@components/HTML/Button'
import { useCheckIfNickNameIsValid } from '@hooks/user/useIsNickNameInvalid'
import useUser from '@sockets/useUser'
import {
  useState,
  useRef,
  useCallback,
  FormEvent,
  ClipboardEventHandler,
  KeyboardEventHandler,
  useEffect,
} from 'react'

enum Option {
  firstName = 'firstName',
  nickName = 'nickName',
  about = 'about',
  lastName = 'lastName',
}

function selectElmCnt(elm: any) {
  if (window.getSelection) {
    var selection = window.getSelection()
    var range = document.createRange()
    range.selectNodeContents(elm)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }
}

export default function ToggleableFormInput({
  value,
  name,
  max,
  min,
}: {
  value: string
  onSubmit?: (value: string) => undefined | string
  max: number
  min: number
  name: 'firstName' | 'lastName' | 'nickName' | 'about'
}) {
  const userSocket = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const checkIfNickNameIsInValid = useCheckIfNickNameIsValid()

  const handleUpdateInfo = useCallback(
    (update: {
      [x in Option]?: string
    }) => {
      if (update.nickName) {
        if (checkIfNickNameIsInValid(update.nickName))
          return 'Invalid Nick name'
      }
      userSocket.emit('updateMe', update)
    },
    [checkIfNickNameIsInValid, userSocket],
  )

  const handleSubmit = useCallback(
    (submitEvent: FormEvent | KeyboardEvent) => {
      submitEvent.preventDefault()
      if (error.length > 0) return
      const updatedVal = inputRef.current?.innerText
      if (!updatedVal || updatedVal.trim().length < min)
        return setError('too short!')
      else if (updatedVal.length >= max) return setError('too long!')
      if (updatedVal === value) return setIsEditing(false)
      const submitErr = handleUpdateInfo({ [name]: updatedVal })
      if (submitErr) setError(submitErr)
      else setIsEditing(false)
    },
    [error.length, min, max, value, name, handleUpdateInfo],
  )
  const handlePaste: ClipboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault()
      let textToPaste = e.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, textToPaste)
      if (((e.target as HTMLElement).innerText + textToPaste).length > max) {
        error.length === 0 && setError('Text too long!')
      }
    },
    [error.length, max],
  )

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.key === 'Enter') return handleSubmit(e)
      if (
        inputRef.current &&
        inputRef.current.innerText.length >= max &&
        e.key.length === 1 &&
        e.code !== 'Space' &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey &&
        !e.ctrlKey
      ) {
        return e.preventDefault()
      }
      if (
        (e.target as HTMLElement).innerText.length < max ||
        (e.target as HTMLElement).innerText.length >= min
      )
        setError('')
    },
    [handleSubmit, max, min],
  )

  useEffect(() => {
    inputRef.current?.focus()
  })

  useEffect(() => {
    userSocket.on('error', (msg) => {
      if (msg.includes(name)) {
        setError(`Unable to perform update`)
        setIsEditing(true)
      }
    })
  }, [name, userSocket])

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-between w-full items-end relative'
    >
      <>
        <span className='text-red-400 text-[12px] block absolute top-[-15px] right-[30px]'>
          {error}
        </span>
        <div
          suppressContentEditableWarning={true}
          contentEditable={isEditing ? true : false}
          onKeyDown={handleKeyDown}
          onFocus={(e) => selectElmCnt(e.target)}
          ref={inputRef}
          onPaste={handlePaste}
          className={`bg-transparent px-0 text-contrast-primary border-b-2 
          rounded-none pb-1 grow outline-none break-words max-w-[90%] ${
            isEditing
              ? 'border-b-contrast-primary/75 focus:border-b-accent-darkest'
              : 'border-b-transparent'
          }`}
        >
          {value}
        </div>
      </>

      <Button
        className={`${
          isEditing ? '' : 'hidden'
        } scale-125 p-0 text-contrast-primary/75 transition-color duration-300 pb-1`}
        type='submit'
      >
        <SingleCheckIcon />
      </Button>
      <Button
        className={`${isEditing ? 'hidden' : ''} p-0`}
        onClick={(e) => {
          e.preventDefault()
          setIsEditing((prev) => !prev)
        }}
        type='button'
      >
        <PencilIcon />
      </Button>
    </form>
  )
}
