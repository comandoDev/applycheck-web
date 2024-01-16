import NavbarFooter from "@/app/auth/forms/(routes)/(menu)/components/Navbar/NavbarFooter"
import NavbarHeader from "@/app/auth/forms/(routes)/(menu)/components/Navbar/NavbarHeader"
import NavbarList from "@/app/auth/forms/(routes)/(menu)/components/Navbar/NavbarList"

const Navbar = () => {
    return (
        <div className='h-full w-4/6 bg-white opacity-100 absolute right-0 flex flex-col justify-between'>
            <div>
                <NavbarHeader />
                <NavbarList />
            </div>

            <NavbarFooter />
        </div>
    )
}

export default Navbar