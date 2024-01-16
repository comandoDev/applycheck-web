'use client'

import { NavbarContextProvider } from "@/app/auth/forms/hooks/NavbarContext/useNavbar"
import { FileContextProvider } from "./hooks/FileContext/useFile"
import { FormContextProvider } from "./hooks/FormContext/useForm"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <>
    <NavbarContextProvider>
      <FormContextProvider>
        <FileContextProvider>
          <div className='flex flex-col'>
            {children}
          </div>
        </FileContextProvider>
      </FormContextProvider>
    </NavbarContextProvider>
    </>
  )
}

export default Layout
