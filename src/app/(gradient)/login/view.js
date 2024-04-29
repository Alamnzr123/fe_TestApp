'use client'
import { useFormState } from 'react-dom'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { login } from './action'
import { useMemo } from 'react'

const initialFormState = {
  message: []
}

export default function LoginView() {
  const [state, formAction] = useFormState(login, initialFormState)

  const errorMessages = useMemo(
    () => (Array.isArray(state?.message) ? state?.message : [state?.message]).filter((msg) => msg),
    [state]
  )

  return (
    <form action={formAction} className='flex flex-col gap-4 w-full flex-1 justify-center'>
      <h1 className='text-white font-bold text-2xl ml-5'>Login</h1>
      <Input name='email' type='text' placeholder='Enter Username/Email' />
      <Input name='password' type='password' placeholder='Enter Password' />
      {errorMessages.map((str, idx) => (
        <p key={idx} className='text-xs text-red-400'>
          {str}
        </p>
      ))}
      <Button>Login</Button>
    </form>
  )
}
