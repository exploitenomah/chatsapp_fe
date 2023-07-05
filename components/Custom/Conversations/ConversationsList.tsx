import {
  Conversation,
  ConversationsState,
} from '@store/conversations/initialState'
import { Store } from '@store/index'
import { useSelector, useDispatch } from 'react-redux'
import ConversationItem from './ConversationItem'
import {
  useSearchConversations,
  useGetSortedConversations,
  useGetSearchedMessagesToDisplay,
} from '@hooks/conversations'
import { SearchState } from '@store/search/initialState'
import AuthLoader from '../Auth/AuthComponents'
import { Message } from '@store/messages/initialState'
import { UI } from '@store/ui/initialState'
import { updateSearchText } from '@store/conversations/slice'
import { updateIdOfMsgClickedFromSearch } from '@store/ui/slice'

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
    return <p className='text-accent-dark mt-5 mb-2 text-center'>Not found</p>

  if (searchText && searchText.length > 0 && searchedMessages.length > 0)
    return (
      <div className='flex flex-col my-4 mx-auto'>
        <h4 className='text-xl pl-8 font-weight-100 text-accent-dark mt-5 mb-2'>
          Messages
        </h4>
        {searchedMessages.map((msg) => (
          <ConversationItem
            key={msg._id}
            isActive={false}
            conversation={{
              ...(msg.conversationId as Conversation),
              latestMessage: msg as unknown as Message,
            }}
            showAvatar={false}
            onClick={() => {
              if (searchText.length > 0) {
                dispatch(updateSearchText(''))
                dispatch(updateIdOfMsgClickedFromSearch(msg._id))
              }
            }}
          />
        ))}
      </div>
    )
  return null
}

export default function ConversationsList() {
  const searchedConversations = useSearchConversations()
  const sortedConversations = useGetSortedConversations(searchedConversations)
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  return (
    <>
      {searchText && sortedConversations.length > 0 && (
        <h4 className='text-xl pl-8 font-weight-100 text-accent-dark mt-5 mb-2'>
          Conversations
        </h4>
      )}
      {sortedConversations.map((conversation) => (
        <ConversationItem
          isActive={activeConversation?._id === conversation._id}
          key={conversation._id}
          conversation={conversation as Conversation}
        />
      ))}
      <SearchedMessagesResults />
    </>
  )
}
