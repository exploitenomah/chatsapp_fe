import { useSelector } from 'react-redux'
import { Store } from '@store/index'
import { ConversationsState } from '@store/conversations/initialState'
import { useMemo } from 'react'
import InactiveLeftPanel from './InactiveLeftPanel'
import ActiveLeftPanel from './ActiveLeftPanel'

const AppLeftBodyContent = () => {
  const { hasFetchedInitialConversations, conversations } = useSelector<
    Store,
    ConversationsState
  >((store) => store.conversations)

  const hasConversations = useMemo(
    () => hasFetchedInitialConversations === true && conversations.length > 0,
    [hasFetchedInitialConversations, conversations.length],
  )

  if (!hasConversations) return <InactiveLeftPanel />

  return <ActiveLeftPanel />
}

export default function AppLeftBody() {
  return (
    <>
      <div className='relative app-left-body'>
        <AppLeftBodyContent />
      </div>
    </>
  )
}
