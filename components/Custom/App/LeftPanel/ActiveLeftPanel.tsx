import ConversationsList from '@components/Custom/Conversations/ConversationsList'
import SearchBar from '../../SearchBar'
import { ConversationsState } from '@store/conversations/initialState'
import { Store } from '@store/index'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchText } from '@store/conversations/slice'

const ConversationsSearch = () => {
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const dispatch = useDispatch()
  return (
    <SearchBar
      inputProps={{
        placeholder: 'Search',
        value: searchText,
        onChange: (e) => dispatch(updateSearchText(e.target.value)),
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
