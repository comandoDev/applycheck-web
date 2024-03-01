import { Bell } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import ProfileSettings from "./ProfileSettings"
import Navbar from "./Navbar"
import { useManagerNavbar } from "../../hooks/NavbarContext/useManagerNavbar"
import { ManagerNavbarSelectedOption } from "../../hooks/NavbarContext/ManagerNavbarContext"
import ChangeBranchSelect from "./ChangeBranchSelect"
import Storage from "@/utils/Storage"

const Header = () => {
    const navbarContext = useManagerNavbar()

    const handleImageClick = () => {
        navbarContext?.setSelected(ManagerNavbarSelectedOption.records)
    }

    return (
        <header className="w-screen bg-white shadow-xl h-10 flex justify-between items-center p-10 pr-24 pl-24 fixed z-30">
            <div>
                <Link href='/auth/records' onClick={handleImageClick}>
                    <Image 
                        src="https://denunc.s3.sa-east-1.amazonaws.com/39b16646-330a-4c1f-8a0c-adc30346c791-Group 481767.png"
                        alt=""
                        width={50}
                        height={50}
                        quality={100}
                    />
                </Link>
            </div>
            <div className="w-full flex justify-center">
                <Navbar />
            </div>
            <div className="flex items-center">
                { (Storage.getUser()!.branches!.length > 1) && <ChangeBranchSelect /> }
                <Bell 
                    className="ml-12 cursor-pointer hover:fill-zinc-400"
                    width={28}
                    height={28}
                    fill="#acb3be"
                    weight="fill"
                />
                <ProfileSettings />
            </div>
        </header>
    )
}

export default Header