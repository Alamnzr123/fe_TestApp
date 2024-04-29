import AboutHeader from '@src/ui/AboutHeader'
import InterestsView from './view'
import { getProfile } from '@src/utils/api/getProfile'

const buttonStyle = {
  background: 'linear-gradient(135deg, #ABFFFD 2.64%, #4599DB 102.4%, #AADAFF 102.4%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}

export async function generateMetadata() {
  const { profile } = await getProfile()

  const { username } = profile

  return {
    title: username,
    description: `Interests ${username}`
  }
}

const InterestsPage = async () => {
  const { profile } = await getProfile()

  return (
    <InterestsView profile={profile}>
      <AboutHeader>
        <button style={buttonStyle} className='relative font-bold text-sm' type='submit'>
          Save
        </button>
      </AboutHeader>
    </InterestsView>
  )
}

export default InterestsPage
