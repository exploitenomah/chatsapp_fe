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
import { ReactNode, HTMLAttributes } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeftDrawer from '../LeftDrawer'
import SearchBar from '../SearchBar'
import FriendsList from './FriendsList'
import useFetchInitialSuggestions from '@hooks/friends/useFetchInitialSuggestions'
import { FriendsState } from '@store/friends/initialState'
import RightChevron from '@assets/RightChevron'
import { FriendRequestsCountBadge } from './FriendsNotificationBadges'

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
  const fetchInitialSuggestions = useFetchInitialSuggestions()
  const dispatch = useDispatch()

  return (
    <div>
      <DefaultButton
        onClick={() => {
          fetchInitialSuggestions()
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
          <FriendRequestsCountBadge />
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
              dispatch(removeUserInPreview())
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
  return (
    <>
      <div className='py-2 pl-2 pr-3'>
        <SearchBar inputProps={{ placeholder: 'Search Friends' }} />
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
          <FriendsSearchBar />
          <FriendRequestsButton />
          <FriendsSuggestionButton />
          <SentRequestsButton />
          {children}
        </div>
      </LeftDrawer>
    </>
  )
}

const NoFriendsYetBody = () => {
  const { friends } = useSelector<Store, FriendsState>((store) => store.friends)

  const fetchInitialSuggestions = useFetchInitialSuggestions()
  const dispatch = useDispatch()

  if (friends.length > 0) return null
  return (
    <div className='absolute h-2/5 w-full flex justify-center items-center'>
      <div className='flex justify-center flex-col items-center text-contrast-primary'>
        <h2 className='prose-xl my-5'>You have no friends yet</h2>
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
    </div>
  )
}

export default function FriendRequestsDrawer() {
  return (
    <>
      <FriendsDrawerContainer>
        <div className='pr-[4px] absolute bottom-0 w-full top-[305px] overflow-auto'>
          <div>
            <div className='uppercase text-accent-darkest font-normal pt-7 pb-4 pl-8'>
              Friends on ChatsApp
            </div>
            <div>
              <FriendsList />
              <NoFriendsYetBody />
            </div>
          </div>
        </div>
      </FriendsDrawerContainer>
    </>
  )
}
