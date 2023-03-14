import AppHead from '@components/Custom/Head'
import Hero from '@components/Custom/App/Hero'
import App from '@components/Custom/App/App'
import useRoot from '@sockets/useRoot'
import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { UI } from '@store/ui/initialState'
import AppLoadingScreen from '@components/Custom/App/LoadingScreen'
import { Notifications } from '@store/notifications/initialState'
import NotificationComponent from '@components/Custom/Notification'
import Offline from '@components/Custom/Offline/Offline'
import useOffline from '@hooks/useOffline'

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
  const { appLoading } = useSelector<Store, UI>((store) => store.ui)
  const rootSocket = useRoot()

  useOffline()

  if (isOffline)
    return (
      <Render favicon='/images/favicon-error.png'>
        <Offline />
      </Render>
    )
  if (appLoading)
    return (
      <Render>
        <AppLoadingScreen />
      </Render>
    )
  if (token)
    return (
      <Render>
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
