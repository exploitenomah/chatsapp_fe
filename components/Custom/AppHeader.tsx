import FriendsIcon from '@/assets/FriendsIcon'
import MsgBubbleIcon from '@/assets/MsgBubbleIcon'
import OptionsIcon from '@/assets/OptionsIcon'
import Button from '@components/HTML/Button'
import Image from 'next/image'
import { ReactNode } from 'react'

const NavItem = ({ children }: { children: ReactNode }) => {
  return (
    <li>
      <Button className='p-2 max-w-[40px] max-h-[40px] shadow-none flex justify-center items-center ml-2.5'>
        {children}
      </Button>
    </li>
  )
}

export const headerClasses = 'bg-secondary-default'

export default function AppHeader() {
  return (
    <div className={`${headerClasses} py-2.5 px-4`}>
      <header className='flex justify-between items-center'>
        <Button className='p-0'>
          <Image
            className='rounded-full w-10 h-10 object-contain'
            src='https://pps.whatsapp.net/v/t61.24694-24/319864754_753310922957117_7159812533690157405_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTfrWkgK_b4cN1noeg1D-8xm312_jaqBAxlcIILTh9hfg&oe=6410DA08'
            alt={''}
            width={40}
            height={40}
            loading={'eager'}
            priority
          />
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
