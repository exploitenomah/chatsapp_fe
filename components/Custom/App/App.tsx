import useAppManager from '@hooks/useAppManager'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useSelector } from 'react-redux'
import AppMobile from './AppMobile'
import AppDesktop from './AppDesktop'
import AppLoadingScreen from './LoadingScreen'

export default function App() {
  const { deviceIsMobile } = useSelector<Store, UI>((store) => store.ui)
  const { appLoading } = useSelector<Store, UI>((store) => store.ui)

  useAppManager()

  if (appLoading) return <AppLoadingScreen />
  if (deviceIsMobile) return <AppMobile />
  else return <AppDesktop />
}
