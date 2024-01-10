'use client'

import { FormContextProvider } from "./hooks/useForm"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <>
        <FormContextProvider>
            <div className='flex flex-col'>
                {children}
            </div>
        </FormContextProvider>
    </>
  )
}

export default Layout
