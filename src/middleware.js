import { NextResponse } from 'next/server'
import { getProfile } from './utils/api/getProfile'
import { HOME_PATH, LOGIN_PATH } from './constants/page'

export async function middleware(request) {
  const { profile } = await getProfile()

  if (request.nextUrl.pathname === HOME_PATH) return NextResponse.redirect(new URL(LOGIN_PATH, request.url))

  if (!profile) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
  }
}

export const config = {
  matcher: ['/about/:path*', '/']
}
