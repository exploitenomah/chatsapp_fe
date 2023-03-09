import Button from '@components/HTML/Button'
import Input from '@components/HTML/Input'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useSelector } from 'react-redux'
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

const Form = ({
  handleSubmit,
}: {
  handleSubmit: (signupDetails: SignupDetails) => void
}) => {
  const [signupDetails, setSignupDetails] = useState(initialSignupDetails)

  const handleFormChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      setSignupDetails((prev) => ({
        ...prev,
        [changeEvent.target.name]: changeEvent.target.value,
      }))
    },
    [],
  )

  const onSubmit = useCallback(
    (submitEvent: FormEvent) => {
      submitEvent.preventDefault()
      handleSubmit(signupDetails)
    },
    [handleSubmit, signupDetails],
  )

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

export default function Signup() {
  const { showSignup } = useSelector<Store, UI>((store) => store.ui)
  const handleSubmit = useCallback((signupDetails: SignupDetails) => {
    console.log(signupDetails)
  }, [])
  return (
    <FormContainer
      show={showSignup}
      mode='sign up'
      title='Get Started With ChatsApp'
    >
      <Form handleSubmit={handleSubmit} />
    </FormContainer>
  )
}
