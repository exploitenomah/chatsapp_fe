import ConversationsList from '@components/Custom/Conversations/ConversationsList'
import SearchBar from '../../SearchBar'

export default function ActiveLeftPanel() {
  return (
    <>
      <div className='sticky top-0 w-full z-10'>
        {/* <div className='w-11/12 mx-auto py-2'>
          <SearchBar
            inputProps={{ placeholder: 'Search or start a new chat top-[52px]' }}
          />
        </div> */}
      </div>
      <div className='absolute bottom-0 w-full overflow-auto top-2'>
        <ConversationsList />
      </div>
    </>
  )
}
