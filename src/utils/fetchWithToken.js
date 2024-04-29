'use server'

import { cookies } from 'next/headers'

const getAllToken = () =>
  cookies()
    .getAll()
    .reduce((prev, curr) => {
      prev[curr.name] = curr.value
      return prev
    }, {})

export const fetchWithToken = (url, options) => {
  return fetch(url, {
    headers: { ...getAllToken(), 'Content-Type': 'application/json', ...options?.headers },
    ...options
  })
}
