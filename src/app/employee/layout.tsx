/* eslint-disable no-undef */
'use client'

import Content from './components/Content'
import Header from './components/Header'
import Storage from '@/utils/Storage'

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
//   const isAuthenticated = Storage.getUserToken()
  const isAuthenticated = true

//   useEffect(() => {
//     if (!isAuthenticated) return redirect('/signin/user')
//   }, [])

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
