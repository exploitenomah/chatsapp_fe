import LeftArrow from '@assets/LeftArrow'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import {
  toggleShowConversationSearchDrawer,
  updateIdOfMsgClickedFromSearch,
} from '@store/ui/slice'
import { useRef, useState, Dispatch, SetStateAction, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeftDrawer from '../LeftDrawer'
import SearchBar from '../SearchBar'
import {
  toggleLoading,
  updateSearchText as updateAppSearch,
} from '@store/search/slice'
import { SearchState, searchLimit } from '@store/search/initialState'
import useDebounce from '@hooks/useDebounce'
import useSearch from '@sockets/useSearch'
import AuthLoader from '../Auth/AuthComponents'
import {
  useGetSearchedMessagesToDisplay,
  formatDateTime,
} from '@hooks/conversations'
import SearchableContent from '../Search/SearchableContent'
import { SearchedMessage } from '@store/messages/initialState'

const SearchedMessage = ({
  isActive,
  msg,
  searchText = '',
}: {
  isActive?: boolean
  msg: SearchedMessage
  searchText: string
}) => {
  const timeOfMsg = formatDateTime(msg.createdAt)

  return (
    <>
      <span
        className={`w-full flex items-center ${
          isActive
            ? 'bg-secondary-darkest'
            : 'bg-primary-default hover:bg-secondary-default '
        }`}
      >
        <span className='cursor-pointer flex items-center pr-[6px] w-full border-b border-b-contrast-secondary/20'>
          <span className='basis-auto flex items-center justify-between grow py-3'>
            <span className='grow text-contrast-strong/80 text-base text-left pl-8 font-normal tracking-wide'>
              <SearchableContent text={msg.text || ''} search={searchText} />
            </span>
            <span className='flex flex-col justify-center items-center self-start text-xs text-contrast-secondary/80 font-light pr-3'>
              {timeOfMsg}
            </span>
          </span>
        </span>
      </span>
    </>
  )
}
const Header = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch()
  return (
    <>
      <header className='h-[108px] flex justify-between items-center text-contrast-tertiary/80 bg-secondary-default px-6'>
        <div className='h-[59px] flex items-center'>
          <Button
            className='p-0 w-12'
            onClick={() => {
              onClose()
              dispatch(toggleShowConversationSearchDrawer(false))
            }}
          >
            <LeftArrow />
          </Button>
          <span className='text-lg font-medium'>Search Messages</span>
        </div>
      </header>
    </>
  )
}

const ConversationSearchBar = ({
  searchText,
  setSearchText,
}: {
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
}) => {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const searchedMessages = useGetSearchedMessagesToDisplay({
    conversationId: activeConversation?._id,
    searchText,
  })
  const searchSocket = useSearch()
  const searchBarRef = useRef<null | HTMLInputElement>(null)
  const dispatch = useDispatch()

  const search = useDebounce((searchText) => {
    if (searchedMessages.length === 0) {
      searchSocket.emit('searchMessages', {
        search: searchText,
        limit: searchLimit,
        // page: searchedUsersPage,
        conversationId: activeConversation?._id,
      })
    } else {
      dispatch(toggleLoading(false))
    }
  }, 800)

  return (
    <>
      <div className='py-2 pl-2 pr-3'>
        <SearchBar
          inputProps={{
            placeholder: 'Search',
            value: searchText,
            onChange: (e) => {
              setSearchText(e.target.value)
              if (e.target.value.length > 1) {
                search(e.target.value)
                dispatch(toggleLoading(true))
              }
            },
          }}
          ref={searchBarRef}
        />
      </div>
    </>
  )
}
const SearchedMessagesResults = ({ searchText }: { searchText: string }) => {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  const { loading } = useSelector<Store, SearchState>((store) => store.search)
  const dispatch = useDispatch()
  const searchedMessages = useGetSearchedMessagesToDisplay({
    conversationId: activeConversation?._id,
    searchText,
  })

  if (searchText.length <= 1)
    return <p className='text-accent-dark text-center'>Type to search</p>
  if (searchText.length > 0 && loading) return <AuthLoader />
  if (
    searchText &&
    searchText.length > 0 &&
    searchedMessages.length === 0 &&
    loading === false
  )
    return <p className='text-accent-dark mt-5 mb-2 text-center'>Not found</p>
  if (searchText.length > 0 && searchedMessages.length > 0)
    return (
      <div className='flex flex-col my-4 mx-auto'>
        <h4 className='text-xl pl-8 font-weight-100 text-accent-dark mt-5 mb-2'>
          Messages
        </h4>

        {searchedMessages.map((msg) => (
          <Button
            className='p-0'
            key={msg._id}
            onClick={() => {
              if (searchText.length > 0) {
                dispatch(updateIdOfMsgClickedFromSearch(msg._id))
              }
            }}
          >
            <SearchedMessage
              msg={msg}
              searchText={searchText}
              isActive={false}
            />
          </Button>
        ))}
      </div>
    )
  return null
}
export default function ConversationSearchDrawer() {
  const { showConversationSearchDrawer } = useSelector<Store, UI>(
    (store) => store.ui,
  )
  const [searchText, setSearchText] = useState('')
  return (
    <>
      <LeftDrawer zIndex={'z-[100]'} show={showConversationSearchDrawer}>
        {showConversationSearchDrawer && (
          <div className='relative h-full'>
            <Header onClose={() => setSearchText('')} />
            <ConversationSearchBar
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <SearchedMessagesResults searchText={searchText} />
          </div>
        )}
      </LeftDrawer>
    </>
  )
}
