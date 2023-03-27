import OptionsIcon from '@assets/OptionsIcon'
import SearchIcon from '@assets/SearchIcon'
import { headerClasses, NavItem } from '../App/AppHeader'
import Avatar from '../Avatar'

export default function ConversationHeader() {
  return (
    <header className={`${headerClasses} flex items-center justify-between`}>
      <div>
        <Avatar />
      </div>
      <ul className='flex items-center'>
        <NavItem buttonProps={{}}>
          <SearchIcon />
        </NavItem>
        <NavItem buttonProps={{}}>
          <OptionsIcon />
        </NavItem>
      </ul>
    </header>
  )
}
