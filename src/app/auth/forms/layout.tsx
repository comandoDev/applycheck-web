'use client'

import { FileContextProvider } from "./hooks/useFile"
import { FormContextProvider } from "./hooks/useForm"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <>
        <FormContextProvider>
          <FileContextProvider>
            <div className='flex flex-col'>
                {children}
            </div>
          </FileContextProvider>
        </FormContextProvider>
    </>
  )
}

export default Layout
