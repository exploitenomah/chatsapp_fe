import { FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { removeUserInPreview, updateUserInPreview } from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FriendItem from '../Friends/FriendItem'

export default function SuggestionsList() {
  const { suggestions } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)
  const dispatch = useDispatch()

  const handleSuggestionClick = useCallback(
    (suggestion: User) => {
      if (userInPreview && userInPreview._id === suggestion._id) return
      dispatch(removeUserInPreview())
      setTimeout(() => {
        dispatch(updateUserInPreview({ ...suggestion }))
      }, 320)
    },
    [dispatch, userInPreview],
  )

  return (
    <>
      <div>
        {suggestions.map((suggestion) => (
          <div
            key={suggestion._id}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <FriendItem
              active={
                userInPreview ? userInPreview._id === suggestion._id : false
              }
              user={suggestion}
            />
          </div>
        ))}
      </div>
    </>
  )
}
