import { Store } from '@store/index'
import { FriendsState } from '@store/friends/initialState'
import { useSelector } from 'react-redux'
import { SearchState } from '@store/search/initialState'
import { useCallback, useMemo } from 'react'
import { User } from '@store/user/initialState'
import { isSubString } from '@utils/index'
import { SuggestionItem } from '../FriendsSuggestions/SuggestionsList'
import { FriendItem } from '../Friends/FriendsList'

export const useSearchFriends = () => {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { friends } = useSelector<Store, FriendsState>((store) => store.friends)
  const { searchText, searchedUsersResults } = useSelector<Store, SearchState>(
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
        isSubString(
          `${otherUser.firstName} ${otherUser.lastName}`,
          searchText,
        ) ||
        isSubString(otherUser.nickName, searchText)
      )
    })
  }, [authenticatedUser._id, friends, searchText])

  const searchResultsToDisplay = useMemo(() => {
    return searchedUsersResults.filter((user) => {
      return (
        isSubString(user.firstName, searchText) ||
        isSubString(user.lastName, searchText) ||
        isSubString(`${user.firstName} ${user.lastName}`, searchText) ||
        isSubString(user.nickName, searchText)
      )
    })
  }, [searchText, searchedUsersResults])

  return useMemo(() => {
    let friendsAsUsers = filteredFriends.map((friend) => {
      const otherUser =
        friend.requester._id === authenticatedUser._id
          ? friend.recipient
          : friend.requester
      return otherUser
    })
    return [...friendsAsUsers, ...searchResultsToDisplay]
  }, [authenticatedUser._id, filteredFriends, searchResultsToDisplay])
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
