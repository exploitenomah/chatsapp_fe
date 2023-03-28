import FriendsDrawer from '../Friends/FriendsDrawer'
import FriendsSuggestionDrawer from '../FriendsSuggestions/SuggestionsDrawer'
import FriendRequestsDrawer from '../FriendRequests/FriendRequestsDrawer'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel, {
  useRightPanelOutOfFocusClasses,
} from './RightPanel/RightPanel'
import useConversations from '@sockets/useConversations'
import useUser from '@sockets/useUser'
import { useEffect } from 'react'
import useEmitter from '@hooks/useEmitters'
import { conversationEvents } from '@store/conversations/initialState'
import { User, userEvents } from '@store/user/initialState'
import UserPreview from '../User/UserPreview'
import useGetManyFriends from '@hooks/friends/useGetManyFriends'
import useUpdateFriendsNotifications from '@hooks/friends/useUpdateFriendsNotifications'
import useGetManyFriendRequests from '@hooks/friends/useFetchFriendRequests'
import PendingFriendsDrawer from '../PendingFriends/PendingFriendsDrawer'
import { Store } from '@store/index'
import { useSelector } from 'react-redux'
import { FriendsState } from '@store/friends/initialState'
import useGetManyPendingFriends from '@hooks/friends/useFetchPendingFriends'
import useMessages from '@sockets/useMessages'
import useUpdateConversationsNotifications from '@hooks/conversations/useUpdateConversationsNotifications'
import useGetConversationsNotInState from "@hooks/conversations/useGetConversationsNotInState"

export default function App() {
  const {
    hasFetchedInitialFriends,
    hasFetchedInitialPendingFriends,
    hasFetchedInitialFriendRequests,
  } = useSelector<Store, FriendsState>((store) => store.friends)
  const user = useSelector<Store, User>((store) => store.user)
  const rightPanelOutOfFocusClasses = useRightPanelOutOfFocusClasses()
  const conversationsSocket = useConversations()
  useMessages()
  const conversationsSocketEmitters = useEmitter(
    conversationsSocket,
    conversationEvents,
  )
  const userSocket = useUser()
  const userSocketEmitters = useEmitter(userSocket, userEvents)
  const handleGetFriends = useGetManyFriends()
  const handleGetFriendRequests = useGetManyFriendRequests()
  const handleGetPendingFriends = useGetManyPendingFriends()

  useGetConversationsNotInState()
  useEffect(() => {
    conversationsSocketEmitters.getMany({ page: 1, limit: 100 })
    userSocketEmitters.getMe()
  }, [conversationsSocketEmitters, userSocketEmitters])

  useUpdateFriendsNotifications()
  useUpdateConversationsNotifications()
  useEffect(() => {
    if (user._id.length > 0) {
      !hasFetchedInitialFriends && handleGetFriends()
      !hasFetchedInitialFriendRequests && handleGetFriendRequests()
      !hasFetchedInitialPendingFriends && handleGetPendingFriends()
    }
  }, [
    handleGetFriendRequests,
    handleGetFriends,
    handleGetPendingFriends,
    hasFetchedInitialFriends,
    hasFetchedInitialPendingFriends,
    hasFetchedInitialFriendRequests,
    user._id.length,
  ])

  return (
    <div className='w-screen h-screeen bg-primary-default'>
      <div className='flex max-w-[1600px] mx-auto h-screen 2xl:py-[19px]'>
        <div className='basis-[30%] max-w-[30%] relative overflow-x-hidden'>
          <FriendsDrawer />
          <FriendsSuggestionDrawer />
          <FriendRequestsDrawer />
          <PendingFriendsDrawer />
          <LeftPanel />
        </div>
        <div className='grow flex border-l border-l-contrast-secondary/20'>
          <div
            className={`h-full transition-all duration-150 grow ${rightPanelOutOfFocusClasses}`}
          >
            <RightPanel />
          </div>
          <UserPreview />
        </div>
      </div>
    </div>
  )
}
