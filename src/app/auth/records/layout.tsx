'use client'

import { ManagerNavbarContextProvider } from "@/app/auth/records/hooks/NavbarContext/useManagerNavbar"
import Header from "./components/Header"
import Footer from "./components/Footer"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <ManagerNavbarContextProvider>
      <Header />
      <div className='flex flex-col'>
        {children}
      </div>
      <Footer />
    </ManagerNavbarContextProvider>
  )
}

export default Layout
