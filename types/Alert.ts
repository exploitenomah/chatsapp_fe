export default interface Alert {
  id: number
  message: string
  variant: 'error' | 'warning' | 'success' | 'primary'
}
