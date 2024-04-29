'use server'

import { GET_PROFILE_API_URL } from '@src/constants/api'
import { fetchWithToken } from '../fetchWithToken'

export async function getProfile() {
  const response = await fetchWithToken(GET_PROFILE_API_URL)
  const { data, message } = (await response.json()) || {}

  return { profile: data, message }
}
