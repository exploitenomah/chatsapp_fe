import { Store } from '@store/index'
import { FriendsState } from '@store/friends/initialState'
import { useSelector } from 'react-redux'
import { SearchState } from '@store/search/initialState'
import { useMemo } from 'react'
import { User } from '@store/user/initialState'
import { isMatchingStrStart } from '@utils/index'

export default function AppSearch() {
  const { searchText, searchResults } = useSelector<Store, SearchState>(
    (store) => store.search,
  )
  const { friends } = useSelector<Store, FriendsState>((store) => store.friends)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const searchedItems = useMemo(() => {
    if (searchText.length === 0) return friends
    const friendsSearched = friends
      .filter((friend) => {
        const otherUser =
          friend.requester._id !== authenticatedUser._id
            ? friend.requester
            : friend.recipient

        return (
          isMatchingStrStart(otherUser.firstName, searchText) ||
          isMatchingStrStart(otherUser.lastName, searchText) ||
          isMatchingStrStart(otherUser.nickName, searchText)
        )
      })
      .map((friend) => {
        const otherUser =
          friend.requester._id === authenticatedUser._id
            ? friend.recipient
            : friend.requester
        return otherUser
      })
    return [...friendsSearched, ...searchResults]
  }, [authenticatedUser._id, friends, searchResults, searchText])

  return (
    <>
      <div className='uppercase text-accent-darkest font-normal pt-7 pb-4 pl-8'>
        Results
      </div>
      <>
        {searchedItems.map((item) => (
          <div key={item._id}>{item._id}</div>
        ))}
      </>
    </>
  )
}
