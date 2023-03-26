import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import ConversationRoom from '../../Conversations/Conversation'
import InactiveRightPanel from './InactiveRightPanel'

export const useRightPanelOutOfFocusClasses = () => {
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)
  const outOfFocusClasses = useMemo(
    () =>
      userInPreview
        ? 'blur-[2px] brightness-[50%] pointer-events-none opacity-60'
        : 'blur-0 brightness-[100%] pointer-events-auto opacity-100',
    [userInPreview],
  )
  return outOfFocusClasses
}

export default function RightPanel() {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)

  if (activeConversation !== null) return <ConversationRoom />
  else return <InactiveRightPanel />
}
