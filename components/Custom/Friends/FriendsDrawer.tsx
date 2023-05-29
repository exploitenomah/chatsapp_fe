import AddFriendIcon from '@assets/AddFriendIcon'
import AcceptRequestIcon from '@assets/AcceptRequestIcon'
import FriendsSuggestionsIcon from '@assets/FriendsSuggestionsIcon'
import LeftArrow from '@assets/LeftArrow'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import {
  removeUserInPreview,
  toggleShowFriendRequestsDrawer,
  toggleShowFriendsDrawer,
  toggleShowPendingFriendsDrawer,
  toggleShowSuggestionsDrawer,
} from '@store/ui/slice'
import { ReactNode, HTMLAttributes, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeftDrawer from '../LeftDrawer'
import SearchBar from '../SearchBar'
import FriendsList from './FriendsList'
import { FriendsState } from '@store/friends/initialState'
import RightChevron from '@assets/RightChevron'
import { FriendRequestsCountBadge } from './FriendsNotificationBadges'
import SeeSuggestionsButton from '../FriendsSuggestions/SeeSuggestionsBtn'
import { ConversationsState } from '@store/conversations/initialState'
import { updateSearchText } from '@store/conversations/slice'
import { updateSearchText as updateAppSearch } from '@store/search/slice'
import { SearchState } from '@store/search/initialState'
import AppSearch from '../Search/SearchResults'

const DefaultButton = ({
  onClick,
  children,
  ...otherProps
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <>
      <Button
        onClick={onClick}
        className='flex justify-between items-center w-full hover:bg-secondary-default rounded-none shadow-none font-normal'
        {...otherProps}
      >
        {children}
      </Button>
    </>
  )
}

const FriendsSuggestionButton = () => {
  const { suggestions } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )
  const dispatch = useDispatch()

  if (suggestions.length === 0) return null

  return (
    <div>
      <DefaultButton
        onClick={() => {
          dispatch(toggleShowSuggestionsDrawer())
        }}
      >
        <span className='flex items-center justify-center gap-x-4'>
          <FriendsSuggestionsIcon />
          <span>Suggestions </span>
        </span>
        <RightChevron />
      </DefaultButton>
    </div>
  )
}

const FriendRequestsButton = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <DefaultButton onClick={() => dispatch(toggleShowFriendRequestsDrawer())}>
        <span className='flex items-center justify-center gap-x-4'>
          <AcceptRequestIcon />
          <span>Friend Requests </span>
          <div className='w-5 h-5 relative'>
            <FriendRequestsCountBadge />
          </div>
        </span>
        <RightChevron />
      </DefaultButton>
    </div>
  )
}

const SentRequestsButton = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <DefaultButton onClick={() => dispatch(toggleShowPendingFriendsDrawer())}>
        <span className='flex items-center justify-center gap-x-4'>
          <AddFriendIcon />
          <span>Sent Requests </span>
        </span>
        <RightChevron />
      </DefaultButton>
    </div>
  )
}

const Header = () => {
  const dispatch = useDispatch()
  return (
    <>
      <header className='h-[108px] flex justify-between items-center text-contrast-tertiary/80 bg-secondary-default px-6'>
        <div className='h-[59px] flex items-center'>
          <Button
            className='p-0 w-12'
            onClick={() => {
              dispatch(toggleShowFriendsDrawer())
              setTimeout(() => {
                dispatch(removeUserInPreview())
              }, 150)
            }}
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
  const searchBarRef = useRef<null | HTMLInputElement>(null)
  const dispatch = useDispatch()
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const { searchText: appSearchText } = useSelector<Store, SearchState>(
    (store) => store.search,
  )
  useEffect(() => {
    searchBarRef.current?.focus()
  }, [])

  return (
    <>
      <div className='py-2 pl-2 pr-3'>
        <SearchBar
          inputProps={{
            placeholder: 'Search Chatsapp',
            value: appSearchText,
            onChange: (e) => dispatch(updateAppSearch(e.target.value)),
          }}
          ref={searchBarRef}
        />
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
        {showFriendsDrawer && (
          <div className='relative h-full'>
            <Header />
            <FriendsSearchBar />
            <FriendRequestsButton />
            <FriendsSuggestionButton />
            <SentRequestsButton />
            {children}
          </div>
        )}
      </LeftDrawer>
    </>
  )
}

const NoFriendsYetBody = () => {
  const { friends } = useSelector<Store, FriendsState>((store) => store.friends)

  if (friends.length > 0) return null
  return (
    <div className='absolute h-2/5 w-full flex justify-center items-center'>
      <div className='flex justify-center flex-col items-center text-contrast-primary'>
        <h2 className='prose-lg text-contrast-secondary my-5'>
          You have no friends yet
        </h2>
        <SeeSuggestionsButton />
      </div>
    </div>
  )
}

export default function FriendsDrawer() {
  const { searchText } = useSelector<Store, SearchState>(
    (store) => store.search,
  )
  return (
    <>
      <FriendsDrawerContainer>
        <div className='pr-[4px] absolute bottom-0 w-full top-[305px] overflow-auto'>
          <div>
            <div>
              {searchText.length === 0 ? (
                <>
                  <div className='uppercase text-accent-darkest font-normal pt-7 pb-4 pl-8'>
                    Friends on ChatsApp
                  </div>
                  <FriendsList />
                  <NoFriendsYetBody />
                </>
              ) : (
                <AppSearch />
              )}
            </div>
          </div>
        </div>
      </FriendsDrawerContainer>
    </>
  )
}
