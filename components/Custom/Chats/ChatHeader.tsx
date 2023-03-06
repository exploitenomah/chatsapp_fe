import OptionsIcon from '@assets/OptionsIcon'
import SearchIcon from '@assets/SearchIcon'
import { headerClasses, NavItem } from '../AppHeader'
import Avatar from '../Avatar'

export default function ChatHeader() {
  return (
    <header className={`${headerClasses} flex items-center justify-between`}>
      <div>
        <Avatar />
      </div>
      <ul className='flex items-center'>
        <NavItem>
          <SearchIcon />
        </NavItem>
        <NavItem>
          <OptionsIcon />
        </NavItem>
      </ul>
    </header>
  )
}
