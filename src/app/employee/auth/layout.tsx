/* eslint-disable no-undef */
'use client'

import { useEffect } from 'react'
import Content from '../components/Content'
import Header from '../components/Header'
import Storage from '@/utils/Storage'
import { redirect } from 'next/navigation'

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const isAuthenticated = Storage.getUserToken()

  useEffect(() => {
    if (!isAuthenticated) return redirect('/employee/login')
  }, [])

  return isAuthenticated ? (
    <>
      {/* <Provider> */}
        <div className='flex flex-col'>
          <Header></Header>
          <Content>{children}</Content>
        </div>
      {/* </Provider> */}
    </>
  ) : null
}

export default Layout
