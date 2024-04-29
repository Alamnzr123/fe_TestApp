'use server'

import { CREATE_PROFILE_API_URL, UPDATE_PROFILE_API_URL } from '@src/constants/api'
import { ABOUT_PATH } from '@src/constants/page'
import { redirect } from 'next/navigation'
import { fetchWithToken } from '@src/utils/fetchWithToken'
import { revalidatePath } from 'next/cache'
import { getProfile } from '@src/utils/api/getProfile'

export async function createProfile(formData) {
  const values = {
    name: formData.get('name'),
    birthday: formData.get('birthday'),
    height: Number(formData.get('height')),
    weight: Number(formData.get('weight')),
    interests: []
  }

  const response = await fetchWithToken(CREATE_PROFILE_API_URL, {
    method: 'POST',
    body: JSON.stringify(values)
  })

  const jsonResponse = await response.json()

  if (jsonResponse?.message === 'Profile has been created successfully') {
    revalidatePath(ABOUT_PATH)
    return redirect(ABOUT_PATH)
  }

  return jsonResponse
}

export async function updateProfile(formData) {
  const { profile } = await getProfile()

  const values = {
    name: formData.get('name') || profile?.name,
    birthday: formData.get('birthday') || profile?.birthday,
    height: Number(formData.get('height')) || profile?.height,
    weight: Number(formData.get('weight')) || profile?.weight,
    interests: formData.get('interests')?.split(',') || profile?.interests
  }

  const response = await fetchWithToken(UPDATE_PROFILE_API_URL, {
    method: 'PUT',
    body: JSON.stringify(values)
  })

  const jsonResponse = await response.json()

  if (jsonResponse?.message === 'Profile has been updated successfully') {
    revalidatePath(ABOUT_PATH)
    return redirect(ABOUT_PATH)
  }

  return jsonResponse
}
