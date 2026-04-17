import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 여기에 차단하고 싶은 IP 주소를 넣으세요
const BLOCKED_IPS = ['175.198.92.228'] 

export function middleware(req: NextRequest) {
  // 접속자의 IP 가져오기
  const ip = req.ip || req.headers.get('x-forwarded-for')

  // IP가 리스트에 있으면 403 에러 페이지 출력
  if (ip && BLOCKED_IPS.includes(ip)) {
    return new NextResponse('Access Denied: Your IP is blocked.', { status: 403 })
  }

  return NextResponse.next()
}

// 이 미들웨어가 모든 페이지에서 작동하도록 설정
export const config = {
  matcher: '/:path*',
}
