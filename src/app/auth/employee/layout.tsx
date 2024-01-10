/* eslint-disable no-undef */
'use client'

import Content from './components/Content'
import Header from './components/Header'

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <>
        <div className='flex flex-col'>
          <Header></Header>
          <Content>{children}</Content>
        </div>
    </>
  )
}

export default Layout
