import FriendsDrawer from '../Friends/FriendsDrawer'
import FriendsSuggestionDrawer from '../FriendsSuggestions/SuggestionsDrawer'
import FriendRequestsDrawer from '../FriendRequests/FriendRequestsDrawer'
import LeftPanel from './LeftPanel/LeftPanel'
import useConversations from '@sockets/useConversations'
import useUser from '@sockets/useUser'
import { useEffect } from 'react'
import useEmitter from '@hooks/useEmitters'
import {
  conversationsEvents,
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
import LeftDrawer from '../LeftDrawer'
import ConversationRoom from '../Conversations/Conversation'

export default function AppMobile() {
  const {
    hasFetchedInitialFriends,
    hasFetchedInitialPendingFriends,
    hasFetchedInitialFriendRequests,
  } = useSelector<Store, FriendsState>((store) => store.friends)
  const { hasFetchedInitialConversations } = useSelector<
    Store,
    ConversationsState
  >((store) => store.conversations)
  const { appLoading, userInPreview, activeConversation } = useSelector<
    Store,
    UI
  >((store) => store.ui)
  const user = useSelector<Store, User>((store) => store.user)
  const dispatch = useDispatch()
  const conversationsSocket = useConversations()
  useMessages()
  const conversationsSocketEmitters = useEmitter(
    conversationsSocket,
    conversationsEvents,
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
    <div className='w-screen h-screen max-w-[650px] mx-auto pt-[60px] md:py-[19px] overflow-hidden'>
      <div
        className={`h-full overflow-hidden bg-primary-default transition-all duration-150 grow relative overflow-x-hidden mx-auto  md:rounded-md`}
      >
        <AuthenticatedUserPreview />
        <FriendsDrawer />
        <FriendsSuggestionDrawer />
        <FriendRequestsDrawer />
        <PendingFriendsDrawer />

        <LeftDrawer show={Boolean(userInPreview)} zIndex='z-[400]'>
          <div className='relative h-full'>
            <UserPreview />
          </div>
        </LeftDrawer>
        <LeftDrawer show={Boolean(activeConversation)} zIndex='z-[100]'>
          <div className='relative h-full'>
            <ConversationRoom />
          </div>
        </LeftDrawer>
        <LeftPanel />
      </div>
    </div>
  )
}
