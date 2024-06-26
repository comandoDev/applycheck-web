'use client'

import Navbar from '@/app/auth/forms/(routes)/(menu)/components/Navbar/Navbar'
import Content from './components/Content'
import Header from './components/Header'
import { useEmployeeNavbar } from '@/app/auth/forms/hooks/NavbarContext/useEmployeeNavbar'

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const navbarContext = useEmployeeNavbar()

  return(
    <>
        <div className='flex flex-col'>
          <Header></Header>
          { navbarContext?.show && (
            <>
              <div className='h-screen w-screen opacity-30 fixed bg-zinc-900 z-50' onClick={() => navbarContext.setShow(false)}></div>
              <Navbar />
            </>
          ) }
          <Content>{children}</Content>
        </div>
    </>
  )
}

export default Layout
