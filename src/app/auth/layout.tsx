/* eslint-disable no-undef */
'use client'

import { useEffect } from 'react'
import Storage from '@/utils/Storage'
import { redirect } from 'next/navigation'
import Content from './employee/components/Content'
import Header from './employee/components/Header'

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const isAuthenticated = Storage.getUserToken()

  useEffect(() => {
    if (!isAuthenticated) return redirect('/login')
  }, [])

  return isAuthenticated ? (
    <>
        <div className='flex flex-col'>
          {children}
        </div>
    </>
  ) : null
}

export default Layout
