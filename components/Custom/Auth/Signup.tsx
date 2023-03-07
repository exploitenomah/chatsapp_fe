import Input from '@components/HTML/Input'
import FormContainer from './FormContainer'

export default function Signup({
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
      mode='sign up'
      onSubmit={(e) => ({})}
      title='Get Started With ChatsApp'
    >
      <div className='flex gap-6 justify-between'>
        <Input placeholder='first name*' required />
        <Input placeholder='last name' />
      </div>
      <Input placeholder='nick name*' required />
      <Input placeholder='email*' required />
      <Input placeholder='password*' required />
    </FormContainer>
  )
}
