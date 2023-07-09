import useAppManager from '@hooks/useAppManager'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useDispatch, useSelector } from 'react-redux'
import AppMobile from './AppMobile'
import AppDesktop from './AppDesktop'
import AppLoadingScreen from './LoadingScreen'
import { toggleShowConversationSearchDrawer } from '@store/ui/slice'
import { useEffect } from 'react'
import useHandleBackButtonMobile from '@hooks/useHandleBackButtonMobile'

export default function App() {
  const { deviceIsMobile } = useSelector<Store, UI>((store) => store.ui)
  const { showConversationSearchDrawer, activeConversation, appLoading } =
    useSelector<Store, UI>((store) => store.ui)
  const dispatch = useDispatch()

  useAppManager()
  useHandleBackButtonMobile()

  useEffect(() => {
    if (activeConversation === null && showConversationSearchDrawer === true) {
      dispatch(toggleShowConversationSearchDrawer(false))
    }
  }, [activeConversation, dispatch, showConversationSearchDrawer])

  if (appLoading) return <AppLoadingScreen />
  if (deviceIsMobile) return <AppMobile />
  else return <AppDesktop />
}
