'use client'
import { useFormState } from 'react-dom'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { register } from './action'
import { useMemo } from 'react'

const initialFormState = {
  message: []
}

export default function RegisterView() {
  const [state, formAction] = useFormState(register, initialFormState)

  const errorMessages = useMemo(
    () => (Array.isArray(state?.message) ? state?.message : [state?.message]).filter((msg) => msg),
    [state]
  )

  return (
    <form action={formAction} className='flex flex-col gap-4 w-full flex-1 justify-center'>
      <h1 className='text-white font-bold text-2xl ml-5'>Register</h1>
      <Input name='email' type='email' placeholder='Enter Email' />
      <Input name='username' type='text' placeholder='Create Username' />
      <Input name='password' type='password' placeholder='Create Password' />
      <Input name='confirm_password' type='password' placeholder='Confirm Password' />
      {errorMessages.map((str, idx) => (
        <p key={idx} className='text-xs text-red-400'>
          {str}
        </p>
      ))}
      <Button>Register</Button>
    </form>
  )
}
