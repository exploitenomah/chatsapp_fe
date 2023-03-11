import AppHead from '@components/Custom/Head'
import Hero from '@components/Custom/App/Hero'
import App from '@components/Custom/App/App'
import useRoot from '@sockets/useRoot'
import { Socket } from 'socket.io-client'
import { useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { UI } from '@store/ui/initialState'
import AppLoadingScreen from '@components/Custom/App/LoadingScreen'
import { Notifications } from '@store/notifications/initialState'
import NotificationComponent from '@components/Custom/Notification'

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

export default function Home() {
  const { token } = useSelector<Store, Auth>((store) => store.auth)
  const { appLoading } = useSelector<Store, UI>((store) => store.ui)

  const onRootSocketConnect = useCallback((socket: Socket) => {
    console.log('onRootSocketConnect', socket)
  }, [])

  const onRootSocketDisconnect = useCallback(() => {
    console.log('onRootSocketDisconnect')
  }, [])

  const onRootSocketError = useCallback(() => {
    console.log('err')
  }, [])

  const rootSocket = useRoot({
    onConnect: onRootSocketConnect,
    onDisconnect: onRootSocketDisconnect,
    onError: onRootSocketError,
  })

  if (appLoading) return <AppLoadingScreen />
  if (token)
    return (
      <>
        <AppNotifications />
        <App />
      </>
    )

  return (
    <>
      <AppHead title='ChatsApp' />
      <Hero />
      <Signup rootSocket={rootSocket} />
      <Login rootSocket={rootSocket} />
      <AppNotifications />
    </>
  )
}
