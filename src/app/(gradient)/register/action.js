'use server'

import { REGISTER_API_URL } from '@src/constants/api'
import { LOGIN_PATH } from '@src/constants/page'
import { redirect } from 'next/navigation'

export async function register(state, formData) {
  const values = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password')
  }

  const { password, confirm_password } = values

  if (password !== confirm_password)
    return {
      message: 'password must be same with confirm password'
    }

  const response = await fetch(REGISTER_API_URL, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const jsonResponse = await response.json()

  if (jsonResponse?.message === 'User has been created successfully') return redirect(LOGIN_PATH)

  return jsonResponse
}
