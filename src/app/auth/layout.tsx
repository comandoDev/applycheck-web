'use client'

import { useEffect } from 'react'
import Storage from '@/utils/Storage'
import { redirect } from 'next/navigation'

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const isAuthenticated = Storage.getUserToken()

  useEffect(() => {
    if (!isAuthenticated) return redirect('/login/manager')
  }, [])

  return isAuthenticated ? (
    <>
        <div className='flex flex-col overflow-hidden'>
          {children}
        </div>
    </>
  ) : null
}

export default Layout
