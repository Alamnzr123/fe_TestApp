'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import LeftArrowSvg from '@public/LeftArrow.svg'

const BackButton = () => {
  const router = useRouter()

  return (
    <button onClick={router.back} className='text-sm font-bold text-white flex gap-2 items-center relative'>
      <Image priority src={LeftArrowSvg} alt='back-icon' />
      Back
    </button>
  )
}

export default BackButton
