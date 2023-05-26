import { Store } from '@store/index'
import { FriendsState } from '@store/friends/initialState'
import { useSelector } from 'react-redux'
import { SearchState } from '@store/search/initialState'
import { useMemo } from 'react'
import { User } from '@store/user/initialState'
import { isMatchingStrStart } from '@utils/index'

const useSearchFriends = () => {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { friends } = useSelector<Store, FriendsState>((store) => store.friends)
  const { searchText, searchResults } = useSelector<Store, SearchState>(
    (store) => store.search,
  )
  const filteredFriends = useMemo(() => {
    if (searchText.length === 0) return friends
    return friends.filter((friend) => {
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
  }, [authenticatedUser._id, friends, searchText])
  return useMemo(() => {
    let friendsAsUsers = filteredFriends.map((friend) => {
      const otherUser =
        friend.requester._id === authenticatedUser._id
          ? friend.recipient
          : friend.requester
      return otherUser
    })
    return [...friendsAsUsers, ...searchResults]
  }, [authenticatedUser._id, filteredFriends, searchResults])
}

export default function AppSearch() {
  const searchedItems = useSearchFriends()

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
