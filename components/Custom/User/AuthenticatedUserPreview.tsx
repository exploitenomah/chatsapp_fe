import CloseIcon from '@assets/CloseIcon'
import LeftArrow from '@assets/LeftArrow'
import PencilIcon from '@assets/PencilIcon'
import SingleCheckIcon from '@assets/SingleCheckIcon'
import Button from '@components/HTML/Button'
import Input from '@components/HTML/Input'
import { Friend, FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import {
  removeUserInPreview,
  toggleShowAuthenticatedUserProfile,
  updateUserInPreview,
} from '@store/ui/slice'
import { User } from '@store/user/initialState'
import {
  EventHandler,
  FormEvent,
  FormEventHandler,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headerClasses } from '../App/AppHeader'
import Avatar from '../Avatar'
import LeftDrawer from '../LeftDrawer'

const FormTextDisplay = ({
  value,
  onSubmit,
  max,
  min,
  alwaysReadOnly,
}: {
  value: string
  onSubmit?: (value: string) => void
  max: number
  min: number
  alwaysReadOnly?: boolean
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [updatedVal, setUpdatedVal] = useState(value)
  const handleSubmit = useCallback(
    (submitEvent: FormEvent | KeyboardEvent) => {
      submitEvent.preventDefault()
      if (!updatedVal || updatedVal.trim().length < min) return
      else if (updatedVal.length >= max) return
      onSubmit && onSubmit(updatedVal)
      setIsEditing(false)
    },
    [max, min, onSubmit, updatedVal],
  )

  useEffect(() => {
    inputRef.current?.focus()
  })

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-between w-full items-end'
    >
      <>
        <div
          suppressContentEditableWarning={true}
          contentEditable={isEditing ? true : false}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit(e)
            else setUpdatedVal((e.target as HTMLElement).innerText)
          }}
          ref={inputRef}
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
      {!alwaysReadOnly &&
        (isEditing ? (
          <Button
            className='scale-125 p-0 text-contrast-primary/75 transition-color duration-300 pb-1'
            type='submit'
          >
            <SingleCheckIcon />
          </Button>
        ) : (
          <Button
            className='p-0'
            onClick={(e) => {
              e.preventDefault()
              setIsEditing((prev) => !prev)
            }}
            type='button'
          >
            <PencilIcon />
          </Button>
        ))}
    </form>
  )
}

export default function AuthenticatedUserPreview() {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { showAuthenticatedUserProfile } = useSelector<Store, UI>(
    (store) => store.ui,
  )
  const dispatch = useDispatch()

  return (
    <LeftDrawer zIndex='z-[400]' show={showAuthenticatedUserProfile}>
      <div>
        <div className='h-full w-full'>
          <div className={`${headerClasses} flex items-center pb-4`}>
            <header className='h-[80px] w-full flex justify-between items-end font-light text-contrast-tertiary text-xl bg-secondary-default px-3'>
              <div className='flex items-center gap-x-1'>
                <Button
                  className='p-0 w-12 font-light'
                  onClick={() =>
                    dispatch(toggleShowAuthenticatedUserProfile(false))
                  }
                >
                  <LeftArrow />
                </Button>
                <span className=''>Profile</span>
              </div>
            </header>
          </div>
          {showAuthenticatedUserProfile && (
            <div className='bg-primary-default py-7'>
              <div className='flex justify-center items-center mb-4'>
                <Avatar width={200} height={200} />
              </div>
              <div className='flex flex-col justify-start items-start gap-y-3 w-[90%] mx-auto my-12'>
                <div className='w-full'>
                  <h3 className='text-sm text-accent-darkest'>Nick name </h3>
                  <FormTextDisplay
                    max={50}
                    min={3}
                    value={authenticatedUser.nickName}
                    onSubmit={(upd) => console.log(upd)}
                  />
                </div>
                <div className='w-full'>
                  <h3 className='text-sm text-accent-darkest'>First name </h3>
                  <FormTextDisplay
                    max={250}
                    min={10}
                    value={authenticatedUser.firstName}
                    onSubmit={(upd) => console.log(upd)}
                  />
                </div>
                <div className='w-full'>
                  <h3 className='text-sm text-accent-darkest'>Last name </h3>
                  <FormTextDisplay
                    max={250}
                    min={10}
                    value={authenticatedUser.lastName}
                    onSubmit={(upd) => console.log(upd)}
                  />
                </div>
                <div className='w-full'>
                  <h3 className='text-sm text-accent-darkest'>About </h3>
                  <FormTextDisplay
                    max={250}
                    min={10}
                    value={authenticatedUser.nickName}
                    onSubmit={(upd) => console.log(upd)}
                  />
                </div>
                <div className='w-full'>
                  <h3 className='text-sm text-accent-darkest flex justify-between'>
                    Email
                  </h3>
                  <FormTextDisplay
                    max={50}
                    min={3}
                    value={authenticatedUser.email}
                    alwaysReadOnly={true}
                  />
                  <Button className='p-0 block text-xs text-contrast-secondary/70 ml-auto -mt-6'>
                    change
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LeftDrawer>
  )
}
