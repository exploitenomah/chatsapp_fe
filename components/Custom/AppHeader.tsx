import FriendsIcon from '@assets/FriendsIcon'
import MsgBubbleIcon from '@assets/MsgBubbleIcon'
import OptionsIcon from '@assets/OptionsIcon'
import Button from '@components/HTML/Button'
import { ReactNode } from 'react'
import Avatar from './Avatar'

export const NavItem = ({ children }: { children: ReactNode }) => {
  return (
    <li>
      <Button className='p-2 max-w-[40px] max-h-[40px] shadow-none flex justify-center items-center ml-2.5'>
        {children}
      </Button>
    </li>
  )
}

export const headerClasses = 'bg-secondary-default py-2.5 px-4 '

export default function AppHeader() {
  return (
    <div className={`${headerClasses}`}>
      <header className='flex justify-between items-center'>
        <Button className='p-0'>
          <Avatar />
        </Button>
        <nav>
          <ul className='flex items-center'>
            <NavItem>
              <FriendsIcon />
            </NavItem>
            <NavItem>
              <MsgBubbleIcon />
            </NavItem>
            <NavItem>
              <OptionsIcon />
            </NavItem>
          </ul>
        </nav>
      </header>
    </div>
  )
}
