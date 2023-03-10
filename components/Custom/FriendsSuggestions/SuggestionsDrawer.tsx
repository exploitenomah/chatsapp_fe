import FriendsSuggestionsIcon from '@assets/FriendsSuggestionsIcon'
import LeftArrow from '@assets/LeftArrow'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { toggleShowSuggestionsDrawer } from '@store/ui/slice'
import { useDispatch, useSelector } from 'react-redux'
import FriendsList from '../Friends/FriendsList'
import LeftDrawer from '../LeftDrawer'
import SearchBar from '../SearchBar'

const Header = () => {
  const dispatch = useDispatch()
  return (
    <>
      <header className='h-[108px] flex flex-col justify-end text-contrast-tertiary/80 bg-secondary-default px-6'>
        <div className='h-[59px] flex items-center'>
          <Button
            className='p-0 w-12'
            onClick={() => dispatch(toggleShowSuggestionsDrawer())}
          >
            <LeftArrow />
          </Button>
          <span className='text-lg font-medium'>Suggestions</span>
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
            <FriendsList />
          </div>
        </div>
      </div>
    </LeftDrawer>
  )
}
