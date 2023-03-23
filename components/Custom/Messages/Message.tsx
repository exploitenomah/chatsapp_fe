import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useSelector } from 'react-redux'
import CurrentUserMsg from './CurrentUser'
import OtherUserMsg from './OtherUser'
import { Fragment, ReactNode, useMemo } from 'react'
import { User } from '@store/user/initialState'
import { Message } from '@store/messages/initialState'

export const MessageWrapper = ({
  children,
  isConcurrentSender,
}: {
  children: ReactNode | ReactNode[]
  isConcurrentSender: boolean
}) => {
  return (
    <div className={`w-full ${isConcurrentSender ? 'mb-[2px]' : 'mb-3'}`}>
      {children}
    </div>
  )
}

export default function MessageComponent({ message }: { message: Message }) {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)

  if (message.sender === authenticatedUser._id) return <CurrentUserMsg message={message} />
  return <OtherUserMsg message={message} />
}
