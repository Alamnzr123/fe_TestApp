import Image from 'next/image'

const style = {
  background: '#162329',
  height: 190
}

const PhotoProfile = ({ username, horoscope, zodiac }) => {
  return (
    <div style={style} className='rounded-2xl relative overflow-hidden'>
      <div className='h-full w-full'>
        <Image
          src='https://live.staticflickr.com/8/7202/7154429164_d26db0a060_z.jpg'
          layout='fill'
          objectFit='cover'
          alt='Picture of the author'
        />
      </div>
      <div className='absolute bottom-3 left-4 flex flex-col gap-2'>
        <p className='font-bold text-white'>{`@${username}`}</p>
        <div className='flex gap-2 flex-wrap'>
          <div className='text-white bg-gray-800 py-1 px-2 rounded-2xl text-xs'>{horoscope}</div>
          <div className='text-white bg-gray-800 py-1 px-2 rounded-2xl text-xs'>{zodiac}</div>
        </div>
      </div>
    </div>
  )
}

export default PhotoProfile
