import ConversationsList from '@components/Custom/Conversations/ConversationsList'
import SearchBar from '../../SearchBar'
import { ConversationsState } from '@store/conversations/initialState'
import { Store } from '@store/index'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchText } from '@store/conversations/slice'
import useDebounce from '@hooks/useDebounce'
import { searchLimit } from '@store/search/initialState'
import { toggleLoading } from '@store/search/slice'
import useSearch from '@sockets/useSearch'
import {
  useGetSearchedMessagesToDisplay,
  useSearchConversations,
} from '@hooks/conversations'

const ConversationsSearch = () => {
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const searchedMessages = useGetSearchedMessagesToDisplay()
  const dispatch = useDispatch()
  const searchSocket = useSearch()
  const searchedConversations = useSearchConversations()
  const search = useDebounce((searchText: string) => {
    if (
      searchedConversations.length === 0 &&
      searchedMessages.length === 0 &&
      searchText.length > 1
    ) {
      searchSocket.emit('searchMessages', {
        search: searchText,
        limit: searchLimit,
        page: 1,
      })
    } else {
      dispatch(toggleLoading(false))
    }
  }, 800)

  return (
    <SearchBar
      inputProps={{
        placeholder: 'Search',
        value: searchText,
        onChange: (e) => {
          dispatch(updateSearchText(e.target.value))
          search(e.target.value)
          dispatch(toggleLoading(true))
        },
      }}
    />
  )
}

export default function ActiveLeftPanel() {
  return (
    <>
      <div className='sticky top-0 w-full z-10'>
        <div className='w-11/12 mx-auto py-2'>
          <ConversationsSearch />
        </div>
      </div>
      <div className='absolute bottom-0 w-full overflow-auto top-[52px]'>
        <ConversationsList />
      </div>
    </>
  )
}
