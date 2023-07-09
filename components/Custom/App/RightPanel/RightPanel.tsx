import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import ConversationRoom, {
  ConversationRoomFooter,
} from '../../Conversations/Conversation'
import InactiveRightPanel from './InactiveRightPanel'
import { User } from '@store/user/initialState'
import ConversationHeader from '@components/Custom/Conversations/ConversationHeader'

export const useRightPanelOutOfFocusClasses = (blur: boolean) => {
  const outOfFocusClasses = useMemo(
    () =>
      blur
        ? 'blur-[2px] brightness-[50%] pointer-events-none opacity-60'
        : 'blur-0 brightness-[100%] pointer-events-auto opacity-100',
    [blur],
  )
  return outOfFocusClasses
}

export default function RightPanel() {
  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)
  // const authenticatedUser = useSelector<Store, User>((store) => store.user)
  // const otherUser = useMemo(
  //   () =>
  //     activeConversation?.participants.find(
  //       (user) => user._id !== authenticatedUser._id,
  //     ),
  //   [activeConversation?.participants, authenticatedUser._id],
  // )

  if (activeConversation !== null)
    return (
      <>
        {/* <div className='relative z-[3] bg-transparent'>
          <ConversationHeader otherUser={otherUser} />
        </div> */}
        <ConversationRoom />
        {/* <div className='relative w-full'>
          <ConversationRoomFooter otherUser={otherUser} />
        </div> */}
      </>
    )
  else return <InactiveRightPanel />
}
