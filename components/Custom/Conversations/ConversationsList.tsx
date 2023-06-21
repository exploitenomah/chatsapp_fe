import {
  Conversation,
  ConversationsState,
} from '@store/conversations/initialState'
import { Store } from '@store/index'
import { useDispatch, useSelector } from 'react-redux'
import ConversationItem from './ConversationItem'
import Button from '@components/HTML/Button'
import { toggleShowFriendsDrawer } from '@store/ui/slice'
import {
  useSearchConversations,
  useGetSortedConversations,
  useGetSearchedMessagesToDisplay,
} from '@hooks/conversations'
import { User } from '@store/user/initialState'
import { updateSearchText as updateAppSearch } from '@store/search/slice'
import useSearch from '@sockets/useSearch'
import { SearchState } from '@store/search/initialState'
import AuthLoader from '../Auth/AuthComponents'

const SearchedMessagesResults = () => {
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const { loading } = useSelector<Store, SearchState>((store) => store.search)
  const dispatch = useDispatch()

  const searchedConversations = useSearchConversations()
  const sortedConversations = useGetSortedConversations(searchedConversations)
  const searchedMessages = useGetSearchedMessagesToDisplay()

  if (searchText && searchText.length === 1 && searchedMessages.length === 0)
    return (
      <p className='text-accent-default text-center'>Keep typing to search</p>
    )
  if (loading) return <AuthLoader />
  if (
    searchText &&
    searchText.length > 0 &&
    sortedConversations.length === 0 &&
    searchedMessages.length === 0 &&
    loading === false
  )
    return <p className='text-accent-primary text-center'>Not found</p>

  if (searchText && searchText.length > 0 && searchedMessages.length > 0)
    return (
      <div className='flex flex-col items-center my-4 mx-auto'>
        <h4 className='text-xl text-accent-dark'>Messages</h4>
        {searchedMessages.map((msg) => (
          <div key={msg._id}>{msg._id}</div>
        ))}
      </div>
    )
  return null
}

export default function ConversationsList() {
  const searchedConversations = useSearchConversations()
  const sortedConversations = useGetSortedConversations(searchedConversations)

  return (
    <>
      {sortedConversations.map((conversation) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation as Conversation}
        />
      ))}
      <SearchedMessagesResults />
    </>
  )
}
