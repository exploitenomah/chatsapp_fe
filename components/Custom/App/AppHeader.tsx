import FriendsIcon from '@assets/FriendsIcon'
import OptionsIcon from '@assets/OptionsIcon'
import Button from '@components/HTML/Button'
import {
  toggleShowAppOptions,
  toggleShowAuthenticatedUserProfile,
  toggleShowFriendsDrawer,
} from '@store/ui/slice'
import { HTMLAttributes, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar'
import { TotalFriendsNotificationsBadge } from '@components/Custom/Friends/FriendsNotificationBadges'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import useLogout from '@hooks/user/useLogout'
import { User } from '@store/user/initialState'
import { createPortal } from 'react-dom'

export const NavItem = ({
  children,
  ...buttonProps
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <>
      <Button
        {...buttonProps}
        className={`${buttonProps.className} p-2 max-w-[40px] max-h-[40px] shadow-none flex justify-center items-center ml-2.5`}
      >
        {children}
      </Button>
    </>
  )
}

export const headerClasses = 'bg-secondary-default py-2.5 px-4 '

export const OptionsComponent = ({
  toggleShowOptions,
  children,
  showOptions,
}: {
  toggleShowOptions: () => void
  children: ReactNode | ReactNode[]
  showOptions: boolean
}) => {
  return (
    <>
      {showOptions &&
        createPortal(
          <div
            onClick={() => toggleShowOptions()}
            className='fixed w-screen h-screen inset-0 bg-transparent z-[98]'
          ></div>,
          document.getElementsByTagName('body')[0] || <></>,
        )}
      <div className='relative'>
        <NavItem onClick={() => toggleShowOptions()}>
          <OptionsIcon />
        </NavItem>
        <div
          onClick={() => toggleShowOptions()}
          className={`${
            showOptions ? 'block' : 'hidden'
          } fixed right-0 bottom-0 top-0 left-0`}
        />
        <div
          className={`${
            showOptions ? 'scale-100' : 'scale-0'
          } bg-primary-default min-h-[50px] px-4 shadow-2xl shadow-primary-dark/50 origin-top-right absolute top-[10px] duration-300 right-[32px] min-w-[100px] z-[99] flex flex-col justify-center items-center`}
        >
          {children}
        </div>
      </div>
    </>
  )
}
export default function AppHeader() {
  const dispatch = useDispatch()
  const logUserOut = useLogout()
  const { showAppOptions } = useSelector<Store, UI>((store) => store.ui)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  return (
    <div className={`${headerClasses}`}>
      <header className='flex justify-between items-center'>
        <Button
          className='p-0'
          onClick={() => dispatch(toggleShowAuthenticatedUserProfile(true))}
        >
          <Avatar
            src={authenticatedUser.profileImage?.path || ''}
            alt={`${authenticatedUser.nickName} ${authenticatedUser.lastName}`}
            width={40}
            height={40}
          />
        </Button>
        <nav>
          <ul className='flex items-center'>
            <li>
              <NavItem
                className='relative'
                onClick={() => dispatch(toggleShowFriendsDrawer())}
              >
                <span className='absolute bottom-[50%] w-5 h-5 scale-x-75 scale-y-75 right-[-3px] scale-1'>
                  <TotalFriendsNotificationsBadge />
                </span>
                <FriendsIcon />
              </NavItem>
            </li>
            <li>
              <OptionsComponent
                showOptions={showAppOptions}
                toggleShowOptions={() => dispatch(toggleShowAppOptions())}
              >
                <Button
                  className='text-red-300 shadow-none'
                  onClick={() => {
                    dispatch(toggleShowAppOptions())
                    logUserOut()
                  }}
                >
                  Logout
                </Button>
              </OptionsComponent>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
