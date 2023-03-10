import FriendsIcon from '@assets/FriendsIcon'
import OptionsIcon from '@assets/OptionsIcon'
import Button from '@components/HTML/Button'
import { toggleShowFriendsDrawer } from '@store/ui/slice'
import { HTMLAttributes, ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import Avatar from '../Avatar'

export const NavItem = ({
  children,
  buttonProps,
}: {
  children: ReactNode
  buttonProps: HTMLAttributes<HTMLButtonElement>
}) => {
  return (
    <li>
      <Button
        {...buttonProps}
        className='p-2 max-w-[40px] max-h-[40px] shadow-none flex justify-center items-center ml-2.5'
      >
        {children}
      </Button>
    </li>
  )
}

export const headerClasses = 'bg-secondary-default py-2.5 px-4 '

export default function AppHeader() {
  const dispatch = useDispatch()

  return (
    <div className={`${headerClasses}`}>
      <header className='flex justify-between items-center'>
        <Button className='p-0'>
          <Avatar />
        </Button>
        <nav>
          <ul className='flex items-center'>
            <NavItem
              buttonProps={{
                onClick: () => dispatch(toggleShowFriendsDrawer()),
              }}
            >
              <FriendsIcon />
            </NavItem>
            <NavItem buttonProps={{}}>
              <OptionsIcon />
            </NavItem>
          </ul>
        </nav>
      </header>
    </div>
  )
}
