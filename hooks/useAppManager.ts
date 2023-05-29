import { Store } from '@store/index'
import useConversations from '@sockets/useConversations'
import useMessages from '@sockets/useMessages'
import useUser from '@sockets/useUser'
import {
  ConversationsState,
  conversationsEvents,
} from '@store/conversations/initialState'
import { FriendsState } from '@store/friends/initialState'
import { toggleAppLoading } from '@store/ui/slice'
import { User, userEvents } from '@store/user/initialState'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useGetConversationsNotInState from './conversations/useGetConversationsNotInState'
import useUpdateConversationsNotifications from './conversations/useUpdateConversationsNotifications'
import useGetManyFriendRequests from './friends/useFetchFriendRequests'
import useFetchInitialSuggestions from './friends/useFetchInitialSuggestions'
import useGetManyPendingFriends from './friends/useFetchPendingFriends'
import useGetManyFriends from './friends/useGetManyFriends'
import useUpdateFriendsNotifications from './friends/useUpdateFriendsNotifications'
import useEmitter from './useEmitters'
import { UI } from '@store/ui/initialState'

export default function useAppManager() {
  const { appLoading } = useSelector<Store, UI>((store) => store.ui)
  const {
    hasFetchedInitialFriends,
    hasFetchedInitialPendingFriends,
    hasFetchedInitialFriendRequests,
  } = useSelector<Store, FriendsState>((store) => store.friends)
  const { hasFetchedInitialConversations } = useSelector<
    Store,
    ConversationsState
  >((store) => store.conversations)
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
}
