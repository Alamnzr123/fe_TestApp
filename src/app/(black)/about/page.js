import { getProfile } from '@src/utils/api/getProfile'
import AboutView from './view'

export async function generateMetadata() {
  const { profile } = await getProfile()

  const { username } = profile

  return {
    title: username,
    description: `About ${username}`
  }
}

export default async function AboutPage() {
  const { profile } = await getProfile()
  return <AboutView profile={profile} />
}
