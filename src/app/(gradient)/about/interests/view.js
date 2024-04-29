'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { updateProfile } from '@src/app/(black)/about/action'
import CrossSvg from '@public/cross.svg'

const goldTextStyle = {
  background:
    'linear-gradient(74deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}

const InterestsView = ({ children, profile }) => {
  const ref = useRef(null)
  const { interests: initialInterests } = profile
  const [interests, setInterests] = useState(initialInterests || [])

  return (
    <form action={updateProfile} className='flex flex-col items-center min-h-screen w-full'>
      {children}
      <div className='flex-1 flex flex-col justify-center w-full'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-bold' style={goldTextStyle}>
              Tell everyone about yourself
            </p>
            <p className='font-bold text-white'>What interest you?</p>
          </div>
          <div
            style={{ background: 'rgba(217, 217, 217, 0.06)' }}
            className='relative flex gap-3 flex-wrap bg-gray-500 min-h-10 px-5 py-2 rounded-lg'
            onClick={(e) => {
              ref.current.focus()
            }}
          >
            <input
              type='text'
              style={{ background: 'rgba(217, 217, 217, 0.06)' }}
              className='h-full absolute outline-none w-auto border-none opacity-0'
              ref={ref}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  e.preventDefault()
                  setInterests([...interests, e.target.value])
                  e.target.value = ''
                }
              }}
            />
            {interests.map((v, idx) => (
              <span
                style={{ background: 'rgba(255, 255, 255, 0.10)' }}
                className='p-2 text-white text-sm relative rounded-md flex items-center'
                key={idx}
              >
                {v}
                <Image
                  onClick={(e) => {
                    e.stopPropagation()
                    setInterests([...interests.slice(0, idx), ...interests.slice(idx + 1)])
                  }}
                  priority
                  src={CrossSvg}
                  alt='cross-icon'
                />
              </span>
            ))}
            <input type='text' name='interests' hidden value={interests} />
          </div>
        </div>
      </div>
    </form>
  )
}

export default InterestsView
