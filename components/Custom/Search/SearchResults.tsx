import { Store } from '@store/index'
import { FriendsState } from '@store/friends/initialState'
import { useSelector } from 'react-redux'
import { SearchState } from '@store/search/initialState'
import { useCallback, useMemo } from 'react'
import { User } from '@store/user/initialState'
import { isSubString } from '@utils/index'
import { SuggestionItem } from '../FriendsSuggestions/SuggestionsList'
import { FriendItem } from '../Friends/FriendsList'

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
        isSubString(otherUser.firstName, searchText) ||
        isSubString(otherUser.lastName, searchText) ||
        isSubString(otherUser.nickName, searchText)
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
  const { searchText } = useSelector<Store, SearchState>(
    (store) => store.search,
  )
  const { friends } = useSelector<Store, FriendsState>((store) => store.friends)

  const searchedUserIsFriend = useCallback(
    (userId: string) => {
      return friends.find(
        (friendship) =>
          friendship.requester._id === userId ||
          friendship.recipient._id === userId,
      )
    },
    [friends],
  )

  return (
    <>
      <div className='uppercase text-accent-darkest font-normal pt-7 pb-4 pl-8'>
        Results
      </div>
      <>
        {searchedItems.map((user) =>
          searchedUserIsFriend(user._id) ? (
            <FriendItem friendItem={user} key={user._id} />
          ) : (
            <SuggestionItem user={user} key={user._id} search={searchText} />
          ),
        )}
      </>
    </>
  )
}
