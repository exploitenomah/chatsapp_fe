import FriendsSuggestionsIcon from '@assets/FriendsSuggestionsIcon'
import LeftArrow from '@assets/LeftArrow'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import {
  toggleShowFriendsDrawer,
  toggleShowSuggestionsDrawer,
} from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { ReactNode, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeftDrawer from '../LeftDrawer'
import SearchBar from '../SearchBar'
import FriendsList from './FriendsList'
import useFetchFriendsSuggestions from '@hooks/friends/useFetchFriendsSuggestions'
import { FriendsState } from '@store/friends/initialState'

const useFetchInitialSuggestions = () => {
  const { hasFetchedInitialSuggestions } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )
  const handleFetchSuggestions = useFetchFriendsSuggestions()

  const fetchInitialSuggestions = useCallback(() => {
    hasFetchedInitialSuggestions === false && handleFetchSuggestions()
  }, [handleFetchSuggestions, hasFetchedInitialSuggestions])

  return fetchInitialSuggestions
}

const FriendsSuggestionButton = () => {
  const fetchInitialSuggestions = useFetchInitialSuggestions()
  const dispatch = useDispatch()

  return (
    <div>
      <Button
        onClick={() => {
          fetchInitialSuggestions()
          dispatch(toggleShowSuggestionsDrawer())
        }}
        className={`p-0 h-[72px] shadow-none text-contrast-strong/80 rounded-none w-full flex items-center bg-primary-default hover:bg-secondary-default cursor-pointer`}
      >
        <span className='inline-block px-4'>
          <span className='bg-accent-dark rounded-full h-12 w-12 flex justify-center items-center'>
            <FriendsSuggestionsIcon className='text-contrast-tertiary' />
          </span>
        </span>
        <span className='border-y border-y-contrast-secondary/20 h-full flex items-center grow font-normal'>
          Suggestions
        </span>
      </Button>
    </div>
  )
}

const Header = () => {
  const dispatch = useDispatch()
  return (
    <>
      <header className='h-[108px] flex flex-col justify-end text-contrast-tertiary/80 bg-secondary-default px-6'>
        <div className='h-[59px] flex items-center'>
          <Button
            className='p-0 w-12'
            onClick={() => dispatch(toggleShowFriendsDrawer())}
          >
            <LeftArrow />
          </Button>
          <span className='text-lg font-medium'>Friends</span>
        </div>
      </header>
    </>
  )
}

const FriendsSearchBar = () => {
  return (
    <>
      <div className='py-2 pl-2 pr-3'>
        <SearchBar inputProps={{ placeholder: 'Search Chatsapp' }} />
      </div>
    </>
  )
}
const FriendsDrawerContainer = ({
  children,
}: {
  children: ReactNode | ReactNode[]
}) => {
  const { showFriendsDrawer } = useSelector<Store, UI>((store) => store.ui)
  return (
    <>
      <LeftDrawer zIndex={'z-[100]'} show={showFriendsDrawer}>
        <div className='relative h-full'>
          <Header />
          {children}
        </div>
      </LeftDrawer>
    </>
  )
}

const NoFriendsYetBody = () => {
  const fetchInitialSuggestions = useFetchInitialSuggestions()
  const dispatch = useDispatch()

  return (
    <>
      <FriendsSuggestionButton />
      <div className='h-3/5 flex justify-center flex-col items-center text-contrast-primary'>
        <h2 className='prose-2xl mb-5'>You have no friends yet</h2>
        <Button
          onClick={() => {
            fetchInitialSuggestions()
            dispatch(toggleShowSuggestionsDrawer())
          }}
          className='bg-accent-darkest text-contrast-strong'
        >
          See Suggestions
        </Button>
      </div>
    </>
  )
}

export default function FriendsDrawer() {
  const { friendsCount } = useSelector<Store, User>((store) => store.user)

  if (friendsCount === 0)
    return (
      <FriendsDrawerContainer>
        <NoFriendsYetBody />
      </FriendsDrawerContainer>
    )

  return (
    <FriendsDrawerContainer>
      <FriendsSearchBar />
      <div className='pr-[4px]  absolute bottom-0 w-full top-[160px] overflow-auto'>
        <div>
          <FriendsSuggestionButton />
          <div className='uppercase text-accent-darkest font-normal pt-7 pb-4 pl-8'>
            Friends on ChatsApp
          </div>
          <div>
            <FriendsList />
          </div>
        </div>
      </div>
    </FriendsDrawerContainer>
  )
}
