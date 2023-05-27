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
} from '@hooks/conversations'
import { User } from '@store/user/initialState'
import { updateSearchText as updateAppSearch } from '@store/search/slice'

const NoChatsFound = () => {
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const dispatch = useDispatch()

  return (
    <div className='flex flex-col items-center my-4 mx-auto'>
      <p>No Chats Found</p>
      <Button
        onClick={() => {
          dispatch(updateAppSearch(searchText || ''))
          dispatch(toggleShowFriendsDrawer(true))
        }}
        className='flex flex-col items-center my-4 mx-auto bg-primary-light'
      >
        Search Chatsapp
      </Button>
    </div>
  )
}

export default function ConversationsList() {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )

  const searchedConversations = useSearchConversations({
    conversations,
    authenticatedUser,
    searchText: searchText || '',
  })
  const sortedConversations = useGetSortedConversations(searchedConversations)

  if (searchText && searchText.length > 0 && sortedConversations.length === 0)
    return <NoChatsFound />
  return (
    <>
      {sortedConversations.map((conversation) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation as Conversation}
        />
      ))}
    </>
  )
}
