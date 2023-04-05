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
import {
  conversationEvents,
  ConversationsState,
} from '@store/conversations/initialState'
import { User, userEvents } from '@store/user/initialState'
import UserPreview from '../User/UserPreview'
import useGetManyFriends from '@hooks/friends/useGetManyFriends'
import useUpdateFriendsNotifications from '@hooks/friends/useUpdateFriendsNotifications'
import useGetManyFriendRequests from '@hooks/friends/useFetchFriendRequests'
import PendingFriendsDrawer from '../PendingFriends/PendingFriendsDrawer'
import { Store } from '@store/index'
import { useDispatch, useSelector } from 'react-redux'
import { FriendsState } from '@store/friends/initialState'
import useGetManyPendingFriends from '@hooks/friends/useFetchPendingFriends'
import useMessages from '@sockets/useMessages'
import useUpdateConversationsNotifications from '@hooks/conversations/useUpdateConversationsNotifications'
import useGetConversationsNotInState from '@hooks/conversations/useGetConversationsNotInState'
import { toggleAppLoading } from '@store/ui/slice'
import { UI } from '@store/ui/initialState'
import AppLoadingScreen from './LoadingScreen'
import AuthenticatedUserPreview from '../User/AuthenticatedUserPreview'
import useFetchInitialSuggestions from '@hooks/friends/useFetchInitialSuggestions'

export default function App() {
  const {
    hasFetchedInitialFriends,
    hasFetchedInitialPendingFriends,
    hasFetchedInitialFriendRequests,
  } = useSelector<Store, FriendsState>((store) => store.friends)
  const { hasFetchedInitialConversations } = useSelector<
    Store,
    ConversationsState
  >((store) => store.conversations)
  const { appLoading } = useSelector<Store, UI>((store) => store.ui)
  const user = useSelector<Store, User>((store) => store.user)
  const dispatch = useDispatch()
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
  const fetchInitialSuggestions = useFetchInitialSuggestions()

  useEffect(() => {
    fetchInitialSuggestions()
  }, [fetchInitialSuggestions])
  
  useGetConversationsNotInState()
  useEffect(() => {
    hasFetchedInitialConversations === false &&
      conversationsSocketEmitters.getMany({ page: 1, limit: 100 })
    hasFetchedInitialConversations === true &&
      appLoading === true &&
      dispatch(toggleAppLoading(false))

    userSocketEmitters.getMe()
  }, [
    appLoading,
    conversationsSocketEmitters,
    dispatch,
    hasFetchedInitialConversations,
    userSocketEmitters,
  ])

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

  if (appLoading)
    return (
      <>
        <AppLoadingScreen />
      </>
    )

  return (
    <div className='w-screen h-screeen bg-primary-default'>
      <div className='flex max-w-[1600px] mx-auto h-screen 2xl:py-[19px]'>
        <div className='basis-[30%] max-w-[30%] relative overflow-x-hidden'>
          <AuthenticatedUserPreview />
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
