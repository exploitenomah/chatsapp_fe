import Button from '@components/HTML/Button'
import Input from '@components/HTML/Input'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { updateLoading } from '@store/ui/slice'
import { useState, useCallback, ChangeEvent, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import AuthLoader from './AuthLoader'
import FormContainer from './FormContainer'

const initialSignupDetails = {
  nickName: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  confirmPassword: '',
}

type SignupDetails = typeof initialSignupDetails

const Form = ({ rootSocket }: { rootSocket: Socket }) => {
  const [signupDetails, setSignupDetails] = useState(initialSignupDetails)
  const dispatch = useDispatch()
  const handleFormChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = changeEvent.target
      setSignupDetails((prev) => ({
        ...prev,
        [name]: value,
      }))
      localStorage.setItem(name, value)
    },
    [],
  )

  const onSubmit = useCallback(
    (submitEvent: FormEvent) => {
      submitEvent.preventDefault()
      if (signupDetails.password !== signupDetails.confirmPassword) return
      dispatch(updateLoading(true))
      const data = { ...signupDetails } as Partial<SignupDetails>
      delete data.confirmPassword
      rootSocket.emit('signup', data)
    },
    [dispatch, rootSocket, signupDetails],
  )

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || ''
    const lastName = localStorage.getItem('lastName') || ''
    const nickName = localStorage.getItem('nickName') || ''
    const email = localStorage.getItem('email') || ''
    const password = localStorage.getItem('firstName') || ''
    setSignupDetails((prev) => ({
      ...prev,
      firstName,
      lastName,
      nickName,
      email,
      password,
    }))
  }, [])

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <div className='flex gap-6 justify-between'>
        <Input
          placeholder='First name*'
          required
          type='text'
          name='firstName'
          onChange={handleFormChange}
          value={signupDetails.firstName}
        />
        <Input
          placeholder='Last name'
          type='text'
          name='lastName'
          onChange={handleFormChange}
          value={signupDetails.lastName}
        />
      </div>
      <Input
        placeholder='Nick name*'
        required
        type='text'
        name='nickName'
        onChange={handleFormChange}
        value={signupDetails.nickName}
      />
      <Input
        placeholder='Email*'
        required
        type='email'
        name='email'
        onChange={handleFormChange}
        value={signupDetails.email}
      />
      <Input
        placeholder='Password*'
        required
        type='password'
        name='password'
        onChange={handleFormChange}
        value={signupDetails.password}
      />
      <Input
        placeholder='Confirm password*'
        required
        type='password'
        name='confirmPassword'
        onChange={handleFormChange}
        value={signupDetails.confirmPassword}
      />

      <Button
        type='submit'
        name='login'
        className='bg-accent-dark/60 mt-2 capitalize text-lg'
      >
        signup
      </Button>
    </form>
  )
}

export default function Signup({ rootSocket }: { rootSocket: Socket }) {
  const { showSignup, loading } = useSelector<Store, UI>((store) => store.ui)

  return (
    <FormContainer
      show={showSignup}
      mode='sign up'
      title='Get Started With ChatsApp'
    >
      {loading && <AuthLoader />}
      <Form rootSocket={rootSocket} />
    </FormContainer>
  )
}
