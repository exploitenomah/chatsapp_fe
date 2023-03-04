import Button from '@components/HTML/Button'
import Input from '@components/HTML/Input'
import LoadingLogo from '../../../assets/LoadingLogo'
import Modal from '../Modal'
import FormContainer from './FormContainer'

export default function Login({
  show,
  hide,
  switchToLogin,
}: {
  show: boolean
  hide: () => void
  switchToLogin: () => void
}) {
  return (
    <FormContainer
      show={show}
      hide={hide}
      toggle={switchToLogin}
      mode='login'
      onSubmit={(e) => ({})}
      title='Welcome Back!'
    >
      <Input placeholder='nick-name/email*' required />
      <Input placeholder='password*' required />
    </FormContainer>
  )
}
