import SearchIcon from '@assets/SearchIcon'
import { headerClasses, NavItem, OptionsComponent } from '../App/AppHeader'
import Avatar from '../Avatar'
import { useState, useEffect } from 'react'
import Button from '@components/HTML/Button'
import { removeActiveConversation, updateUserInPreview } from '@store/ui/slice'
import { useDispatch } from 'react-redux'
import { User } from '@store/user/initialState'

export default function ConversationHeader({
  otherUser,
}: {
  otherUser?: User
}) {
  const [showConversationOptions, setShowConversationOptions] = useState(false)
  const [showGuide, setShowGuide] = useState(Boolean(otherUser))
  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowGuide(false)
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

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

          <p className='text-sm text-contrast-secondary leading-[10px]'>
            {showGuide && <>click here for user info</>}
          </p>
        </div>
      </div>
      <ul className='flex items-center'>
        <li>
          <NavItem>
            <SearchIcon />
          </NavItem>
        </li>
        <li>
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
        </li>
      </ul>
    </header>
  )
}
