import SearchIcon from '@assets/SearchIcon'
import { headerClasses, NavItem, OptionsComponent } from '../App/AppHeader'
import Avatar from '../Avatar'
import { useState, useEffect } from 'react'
import Button from '@components/HTML/Button'
import { removeActiveConversation, updateUserInPreview } from '@store/ui/slice'
import { useDispatch } from 'react-redux'
import { User } from '@store/user/initialState'

const HeaderOptions = () => {
  const [showConversationOptions, setShowConversationOptions] = useState(false)
  const dispatch = useDispatch()

  return (
    <OptionsComponent
      showOptions={showConversationOptions}
      toggleShowOptions={() => {
        setShowConversationOptions((prev) => !prev)
      }}
    >
      <Button
        className='bg-primary-default'
        onClick={() => {
          dispatch(removeActiveConversation())
          setShowConversationOptions((prev) => !prev)
        }}
      >
        Close Chat
      </Button>
    </OptionsComponent>
  )
}

const TemporaryGuide = ({ showInitially }: { showInitially: Boolean }) => {
  const [showGuide, setShowGuide] = useState(showInitially)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowGuide(false)
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])
  return (
    <p className='text-sm text-contrast-secondary leading-[10px]'>
      {showGuide && <>click here for user info</>}
    </p>
  )
}
export default function ConversationHeader({
  otherUser,
}: {
  otherUser?: User
}) {
  const dispatch = useDispatch()

  return (
    <header className={`${headerClasses} flex items-center justify-between`}>
      <div
        onClick={() => {
          otherUser && dispatch(updateUserInPreview(otherUser))
        }}
        className='flex gap-x-[15px] items-center cursor-pointer'
      >
        <Avatar
          src={otherUser?.profileImage?.path || ''}
          alt={otherUser?.nickName || ''}
          width={40}
          height={40}
        />
        <div>
          <p className='text-ellipsis text-base text-contrast-strong font-medium grow overflow-x-hidden inline-block'>
            {otherUser?.nickName}
          </p>
          <TemporaryGuide showInitially={Boolean(otherUser)} />
        </div>
      </div>
      <ul className='flex items-center'>
        <li>
          <NavItem>
            <SearchIcon />
          </NavItem>
        </li>
        <li>
          <HeaderOptions />
        </li>
      </ul>
    </header>
  )
}
