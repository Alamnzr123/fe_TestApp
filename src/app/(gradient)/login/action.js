'use server'

import { LOGIN_API_URL } from '@src/constants/api'
import { ABOUT_PATH } from '@src/constants/page'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(state, formData) {
  const values = {
    email: formData.get('email'),
    username: formData.get('email'),
    password: formData.get('password')
  }

  const response = await fetch(LOGIN_API_URL, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const jsonResponse = await response.json()

  if (jsonResponse?.message === 'User has been logged in successfully') {
    cookies().set('x-access-token', jsonResponse.access_token)

    return redirect(ABOUT_PATH)
  }

  return jsonResponse
}
