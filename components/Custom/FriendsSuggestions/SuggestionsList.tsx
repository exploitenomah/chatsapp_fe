import { FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { useSelector } from 'react-redux'
import FriendItem from '../Friends/FriendItem'

export default function SuggestionsList() {
  const { suggestions } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )
  return (
    <>
      <div>
        {suggestions.map((suggestion) => (
          <div key={suggestion._id}>
            <FriendItem user={suggestion} />
          </div>
        ))}
      </div>
    </>
  )
}
