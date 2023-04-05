import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { FriendsState } from '@store/friends/initialState'
import {
  toggleShowFriendRequestsDrawer,
  toggleShowSuggestionsDrawer,
  toggleShowPendingFriendsDrawer,
} from '@store/ui/slice'
import { useSelector, useDispatch } from 'react-redux'

export default function SeeSuggestionsButton() {
  const { suggestions } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )

  const dispatch = useDispatch()

  if (suggestions.length === 0) return null
  return (
    <>
      <Button
        onClick={() => {
          dispatch(toggleShowSuggestionsDrawer())
          setTimeout(() => {
            dispatch(toggleShowPendingFriendsDrawer(false))
            dispatch(toggleShowFriendRequestsDrawer(false))
          }, 100)
        }}
        className='bg-accent-darkest text-contrast-strong'
      >
        See Suggestions
      </Button>
    </>
  )
}
