const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {

  return (
    <>
        <div className='flex flex-col'>
          {children}
        </div>
    </>
  )
}

export default Layout
