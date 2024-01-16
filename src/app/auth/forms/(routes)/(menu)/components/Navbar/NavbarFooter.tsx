import Storage from "@/utils/Storage"
import { SignOut } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const NavbarFooter = () => {
    const router = useRouter()

    const handleLogoutClick = () => {
        Storage.clear()

        router.push('/login')
    }

    return (
        <div 
            className="flex justify-between p-5 bg-principal text-white items-center font-bold"
            onClick={handleLogoutClick}
        >
            <span>SAIR</span>
            <SignOut size={32} />
        </div>
    )
}

export default NavbarFooter