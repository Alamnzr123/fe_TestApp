'use client'
import PhotoProfile from '../ui/PhotoProfile'
import Card from '../ui/Card'
import Image from 'next/image'
import Link from 'next/link'
import PencilSvg from '@public/pencil.svg'
import PlusSvg from '@public/plus.svg'
import { useMemo, useState } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { createProfile, updateProfile } from './action'
import { INTERESTS_PATH } from '@src/constants/page'

function diff_years(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000
  diff /= 60 * 60 * 24
  return Math.abs(Math.round(diff / 365.25))
}

export default function AboutView({ profile }) {
  const [isEditAbout, setIsEditAbout] = useState(false)
  const { name, birthday, weight, height, interests, horoscope, zodiac } = profile

  const isInitialProfile = useMemo(() => !(name && birthday && weight && height && interests?.length), [profile])

  const formAction = isInitialProfile ? createProfile : updateProfile

  return (
    <div className='w-full flex-1 flex flex-col gap-5 justify-center'>
      <PhotoProfile {...profile} />
      <Card
        title='About'
        as={isEditAbout ? 'form' : 'action'}
        action={isEditAbout ? formAction : undefined}
        actionButton={
          isEditAbout ? (
            <button type='submit' className='text-yellow-500 text-xs'>
              Save & Update
            </button>
          ) : (
            <button onClick={() => setIsEditAbout(true)}>
              <Image priority src={PencilSvg} alt='edit-icon' />
            </button>
          )
        }
      >
        {isEditAbout ? (
          <AboutForm profile={profile} />
        ) : isInitialProfile ? (
          <FallbackContent message='Add in your your to help others know you better' />
        ) : (
          <div className='flex flex-col gap-3 text-xs'>
            <div className='flex text-gray-300 gap-2'>
              Birthday:{' '}
              <span className='text-white'>
                {birthday?.replaceAll('-', ' / ')} Age ({diff_years(new Date(birthday), new Date())})
              </span>
            </div>
            <div className='flex text-gray-300 gap-2'>
              Horoscope: <span className='text-white'>{horoscope}</span>
            </div>
            <div className='flex text-gray-300 gap-2'>
              Zodiac: <span className='text-white'>{zodiac}</span>
            </div>
            <div className='flex text-gray-300 gap-2'>
              Height: <span className='text-white'>{height} cm</span>
            </div>
            <div className='flex text-gray-300 gap-2'>
              Weight: <span className='text-white'>{weight} kg</span>
            </div>
          </div>
        )}
      </Card>
      <Card
        title='Interest'
        actionButton={
          <Link href={INTERESTS_PATH}>
            <Image priority src={PencilSvg} alt='edit-icon' />
          </Link>
        }
      >
        {interests?.length ? (
          <div className='flex gap-2 flex-wrap'>
            {interests.map((val, idx) => (
              <div className='text-white bg-gray-800 py-2 px-4 rounded-2xl text-xs' key={idx}>
                {val}
              </div>
            ))}
          </div>
        ) : (
          <FallbackContent message='Add in your interest to find a better match' />
        )}
      </Card>
    </div>
  )
}

const inputStyle = {
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  background: 'rgba(217, 217, 217, 0.06)',
  width: 202
}

const genders = ['Male', 'Female']

function AboutForm({ profile }) {
  const [gender, setGender] = useState(profile.gender || '')

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-4 items-center'>
        <button>
          <Image priority src={PlusSvg} alt='add-image' />
        </button>
        <p className='text-white text-sm'>Add image</p>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between items-center' style={{ height: 36 }}>
          <p className='text-gray-500 text-xs'>Display name:</p>
          <input
            name='name'
            defaultValue={profile.name}
            type='text'
            className='h-full px-3 text-white outline-none text-xs'
            placeholder='Enter name'
            style={inputStyle}
          />
        </div>
        <div className='flex justify-between items-center' style={{ height: 36 }}>
          <p className='text-gray-500 text-xs'>Gender:</p>
          <Dropdown options={genders} active={gender} onChange={setGender} />
          <input type='text' hidden value={gender} onChange={() => {}} name='gender' />
        </div>
        <div className='flex justify-between items-center' style={{ height: 36 }}>
          <p className='text-gray-500 text-xs'>Birthday:</p>
          <input
            name='birthday'
            type='date'
            defaultValue={profile.birthday || ''}
            className={`h-full text-xs px-3 outline-none  ${profile.birthday ? 'text-white' : 'text-gray-400'}`}
            placeholder='Enter name'
            style={inputStyle}
          />
        </div>
        <div className='flex justify-between items-center' style={{ height: 36 }}>
          <p className='text-gray-500 text-xs'>Horoscope:</p>
          <input
            value={profile.horoscope || ''}
            type='text'
            placeholder='--'
            disabled
            className='h-full text-xs px-3 outline-none text-gray-400'
            style={inputStyle}
          />
        </div>
        <div className='flex justify-between items-center' style={{ height: 36 }}>
          <p className='text-gray-500 text-xs'>Zodiac:</p>
          <input
            value={profile.zodiac || ''}
            type='text'
            placeholder='--'
            disabled
            className='h-full text-xs px-3 outline-none text-gray-400'
            style={inputStyle}
          />
        </div>
        <div className='flex justify-between items-center' style={{ height: 36 }}>
          <p className='text-gray-500 text-xs'>Height:</p>
          <div className='flex text-xs h-full items-center' style={inputStyle}>
            <input
              placeholder='Add height'
              defaultValue={profile.height}
              name='height'
              type='number'
              min={1}
              max={300}
              className='h-full text-white flex-1 text-xs px-3 outline-none bg-inherit'
            />
            <span className='px-2 text-white'>cm</span>
          </div>
        </div>
        <div className='flex justify-between items-center' style={{ height: 36 }}>
          <p className='text-gray-500 text-xs'>Weight:</p>
          <div className='flex text-xs h-full items-center' style={inputStyle}>
            <input
              placeholder='Add weight'
              defaultValue={profile.weight}
              name='weight'
              type='number'
              min={1}
              max={300}
              className='h-full text-white flex-1 text-xs px-3 outline-none bg-inherit'
            />
            <span className='px-2 text-white'>kg</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FallbackContent(props) {
  return <p className='text-gray-500 text-sm pb-3'>{props.message}</p>
}

function Dropdown({ options, active, onChange }) {
  return (
    <Menu as='div' className='relative' style={inputStyle}>
      <Menu.Button
        className={`px-3 py-2 w-full flex justify-between items-center text-xs ${
          active ? 'text-white' : 'text-gray-400'
        }`}
      >
        {active || 'Select Gender'}
        <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100' aria-hidden='true' />
      </Menu.Button>
      <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
        {options.map((option, idx) => (
          <Menu.Item key={idx} onClick={() => onChange(option)}>
            <button
              className={`${
                option === active ? 'bg-gray-800 text-white' : 'text-gray-900'
              } group flex w-full items-center px-2 py-2 text-sm`}
            >
              {option}
            </button>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

const getHoroscropes = (birthdate) => {
  const year = new Date().getFullYear()

  return
}

const getZodiac = (birthdate) => {
  return
}
