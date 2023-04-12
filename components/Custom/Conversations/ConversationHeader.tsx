import SearchIcon from '@assets/SearchIcon'
import { headerClasses, NavItem, OptionsComponent } from '../App/AppHeader'
import Avatar from '../Avatar'
import { useState } from 'react'
import Button from '@components/HTML/Button'
import { removeActiveConversation } from '@store/ui/slice'
import { useDispatch } from 'react-redux'

export default function ConversationHeader() {
  const [showConversationOptions, setShowConversationOptions] = useState(false)
  const dispatch = useDispatch()

  return (
    <header className={`${headerClasses} flex items-center justify-between`}>
      <div>
        <Avatar src={''} alt={''} width={40} height={40} />{' '}
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
