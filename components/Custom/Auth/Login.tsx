import Input from '@components/HTML/Input'
import FormContainer from './FormContainer'
import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useSelector } from 'react-redux'

const initialLoginDetails = {
  nickNameOrEmail: '',
  password: '',
}

type LoginDetails = typeof initialLoginDetails

const Form = ({
  handleSubmit,
}: {
  handleSubmit: (loginDetails: LoginDetails) => void
}) => {
  const [loginDetails, setLoginDetails] = useState(initialLoginDetails)

  const handleFormChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      setLoginDetails((prev) => ({
        ...prev,
        [changeEvent.target.name]: changeEvent.target.value,
      }))
    },
    [],
  )

  const onSubmit = useCallback(
    (submitEvent: FormEvent) => {
      submitEvent.preventDefault()
      handleSubmit(loginDetails)
    },
    [handleSubmit, loginDetails],
  )

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <Input
        placeholder='Nick Name / Email*'
        required
        type='text'
        name='nickNameOrEmail'
        value={loginDetails.nickNameOrEmail}
        onChange={handleFormChange}
      />
      <Input
        placeholder='Password*'
        required
        type='password'
        name='password'
        value={loginDetails.password}
        onChange={handleFormChange}
      />
      <Button
        type='submit'
        name='login'
        className='bg-accent-dark/60 mt-2 capitalize text-lg'
      >
        Login
      </Button>
    </form>
  )
}

export default function Login() {
  const { showLogin } = useSelector<Store, UI>((store) => store.ui)
  const handleSubmit = useCallback((loginDetails: LoginDetails) => {
    console.log(loginDetails)
  }, [])

  return (
    <FormContainer show={showLogin} mode='login' title='Welcome Back!'>
      <Form handleSubmit={handleSubmit} />
    </FormContainer>
  )
}
