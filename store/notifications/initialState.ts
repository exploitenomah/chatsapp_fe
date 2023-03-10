import Alert from '../../types/Alert'

const initialState: {
  appAlerts: Alert[]
} = {
  appAlerts: [],
}

export type Notifications = typeof initialState

export default initialState
