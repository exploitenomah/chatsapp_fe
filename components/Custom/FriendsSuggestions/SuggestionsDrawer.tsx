import FriendsIcon from '@assets/FriendsIcon'
import LeftArrow from '@assets/LeftArrow'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import {
  removeUserInPreview,
  toggleShowSuggestionsDrawer,
} from '@store/ui/slice'
import { useDispatch, useSelector } from 'react-redux'
import { FriendRequestsCountBadge } from '../Friends/FriendsNotificationBadges'
import LeftDrawer from '../LeftDrawer'
import SearchBar from '../SearchBar'
import SuggestionsList from './SuggestionsList'

const Header = () => {
  const dispatch = useDispatch()

  return (
    <>
      <header className='h-[108px] flex justify-between items-center text-contrast-tertiary/80 bg-secondary-default px-6'>
        <div className='h-[59px] flex items-center'>
          <Button
            className='p-0 w-12'
            onClick={() => {
              dispatch(toggleShowSuggestionsDrawer())
              dispatch(removeUserInPreview())
            }}
          >
            <LeftArrow />
          </Button>
          <span className='text-lg font-medium '>Suggestions</span>
        </div>
        <div className='flex items-center relative'>
          <div className='block absolute bottom-[50%] right-[-6px]'>
            <FriendRequestsCountBadge />
          </div>
          <Button
            title='friend requests'
            className='p-0 gap-x-4 shadow-none flex items-center text-lg'
            onClick={() => {
              dispatch(toggleShowSuggestionsDrawer())
              dispatch(removeUserInPreview())
            }}
          >
            <FriendsIcon />
          </Button>
        </div>
      </header>
    </>
  )
}

export default function FriendsSuggestionDrawer() {
  const { showFriendsSuggestionDrawer } = useSelector<Store, UI>(
    (state) => state.ui,
  )

  return (
    <LeftDrawer zIndex={'z-[200]'} show={showFriendsSuggestionDrawer}>
      <div className='relative h-full'>
        <Header />
        <div className='pr-[4px]  absolute bottom-0 w-full top-[110px] overflow-auto'>
          <div>
            <div className='uppercase text-accent-darkest font-normal pt-7 pb-4 pl-8'>
              People you may like
            </div>
            <SuggestionsList />
          </div>
        </div>
      </div>
    </LeftDrawer>
  )
}
