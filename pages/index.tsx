import AppHead from '@components/Custom/Head'
import Hero from '@components/Custom/App/Hero'
import App from '@components/Custom/App/App'
import useRoot from '@sockets/useRoot'
import { ReactNode, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { Notifications } from '@store/notifications/initialState'
import NotificationComponent from '@components/Custom/Notification'
import Offline from '@components/Custom/Offline/Offline'
import useOffline from '@hooks/useOffline'
import { ConversationsState } from '@store/conversations/initialState'
import { removeAppAlert } from '@store/notifications/slice'
import { UI } from '@store/ui/initialState'
import AppMobile from '@components/Custom/App/AppMobile'
import { toggleDeviceIsMobile } from '@store/ui/slice'

const Login = dynamic(() => import('@components/Custom/Auth/Login'), {
  ssr: false,
})
const Signup = dynamic(() => import('@components/Custom/Auth/Signup'), {
  ssr: false,
})

const AppNotifications = () => {
  const { appAlerts } = useSelector<Store, Notifications>(
    (store) => store.notification,
  )
  const dispatch = useDispatch()
  useEffect(() => {
    const clearNotificationInterval = setInterval(() => {
      if (appAlerts[0]) {
        dispatch(removeAppAlert(appAlerts[0].id))
      }
    }, 4000)
    return () => {
      clearInterval(clearNotificationInterval)
    }
  }, [appAlerts, dispatch])
  return (
    <div className='absolute top-0 right-0 w-[25%]'>
      {appAlerts.map((appAlert) => (
        <NotificationComponent key={appAlert.id} {...appAlert} />
      ))}
    </div>
  )
}

const Render = ({
  title,
  children,
  favicon,
}: {
  title?: string
  favicon?: string
  children: ReactNode | ReactNode[]
}) => {
  return (
    <>
      <AppHead title={title} favicon={favicon} />
      {children}
      <AppNotifications />
    </>
  )
}

export default function ChatsApp() {
  const { token, isOffline } = useSelector<Store, Auth>((store) => store.auth)
  const { conversationsWithUnseenMessagesCount } = useSelector<
    Store,
    ConversationsState
  >((store) => store.conversations)
  const { deviceIsMobile } = useSelector<Store, UI>((store) => store.ui)
  const rootSocket = useRoot()
  const dispatch = useDispatch()

  const handleDeviceType = useCallback(() => {
    if (window.innerWidth <= 900) {
      deviceIsMobile === false && dispatch(toggleDeviceIsMobile(true))
    } else {
      deviceIsMobile === true && dispatch(toggleDeviceIsMobile(false))
    }
  }, [deviceIsMobile, dispatch])

  useEffect(() => {
    handleDeviceType()
    window.addEventListener('resize', (e) => {
      handleDeviceType()
    })
  }, [handleDeviceType])
  useOffline()

  if (isOffline)
    return (
      <Render favicon='/images/favicon-error.png'>
        <Offline />
      </Render>
    )

  if (token && deviceIsMobile)
    return (
      <Render
        title={`${
          conversationsWithUnseenMessagesCount > 0
            ? `(${conversationsWithUnseenMessagesCount})`
            : ''
        } ChatsApp`}
      >
        <AppMobile />
      </Render>
    )
  if (token && !deviceIsMobile)
    return (
      <Render
        title={`${
          conversationsWithUnseenMessagesCount > 0
            ? `(${conversationsWithUnseenMessagesCount})`
            : ''
        } ChatsApp`}
      >
        <App />
      </Render>
    )

  return (
    <Render>
      <Hero />
      <Signup rootSocket={rootSocket} />
      <Login rootSocket={rootSocket} />
    </Render>
  )
}
