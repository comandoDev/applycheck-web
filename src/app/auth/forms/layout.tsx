'use client'

import { NavbarContextProvider } from "@/app/auth/forms/hooks/NavbarContext/useEmployeeNavbar"
import { FileContextProvider } from "./hooks/FileContext/useFile"
import { FormContextProvider } from "./hooks/FormContext/useForm"
import { ActionPlanContextProvider } from "./hooks/ActionPlanContext/useFile"

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
          <ActionPlanContextProvider>
            <div className='flex flex-col'>
              {children}
            </div>
          </ActionPlanContextProvider>
        </FileContextProvider>
      </FormContextProvider>
    </NavbarContextProvider>
    </>
  )
}

export default Layout
