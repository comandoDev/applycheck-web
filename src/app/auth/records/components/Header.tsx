import { Bell } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { useManagerNavbar } from "../hooks/NavbarContext/useManagerNavbar"
import { ManagerNavbarSelectedOption } from "../hooks/NavbarContext/ManagerNavbarContext"
import Storage from "@/utils/Storage"

const Header = () => {
    const navbarContext = useManagerNavbar()

    const handleLiCLick = (selected: ManagerNavbarSelectedOption) => {
        navbarContext?.setSelected(selected)
    }

    const normalLiStyle = 'pb-7 pt-7 mr-5 text-zinc-500 font-medium'
    const selectedLiStyle = 'pb-7 pt-7 mr-5 border-b-2 border-principal text-principal'

    return (
        <div className="w-screen bg-white shadow-xl h-10 flex justify-between items-center p-10 pr-24 pl-24 fixed z-30">
            <div>
                <Link href='/auth/records'>
                    <Image 
                        src="https://denunc.s3.sa-east-1.amazonaws.com/39b16646-330a-4c1f-8a0c-adc30346c791-Group 481767.png"
                        alt=""
                        width={50}
                        height={50}
                        quality={100}
                    />
                </Link>
            </div>
            <div>
                <ul className="flex">
                    <li className={`${navbarContext?.selected === ManagerNavbarSelectedOption.records ? selectedLiStyle : normalLiStyle}`}>
                        <Link href='' onClick={() => handleLiCLick(ManagerNavbarSelectedOption.records)}>Registros</Link>
                    </li>
                    <li className={`${navbarContext?.selected === ManagerNavbarSelectedOption.forms ? selectedLiStyle : normalLiStyle}`}>
                        <Link href='' onClick={() => handleLiCLick(ManagerNavbarSelectedOption.forms)}>Formulários</Link>
                    </li>
                    <li className={`${navbarContext?.selected === ManagerNavbarSelectedOption.employees ? selectedLiStyle : normalLiStyle}`}>
                        <Link href='' onClick={() => handleLiCLick(ManagerNavbarSelectedOption.employees)}>Funcionário</Link>
                    </li>
                    <li className={`${navbarContext?.selected === ManagerNavbarSelectedOption.config ? selectedLiStyle : normalLiStyle}`}>
                        <Link href='' onClick={() => handleLiCLick(ManagerNavbarSelectedOption.config)}>Configurações</Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center">
                <Bell 
                    width={28}
                    height={28}
                    fill="#acb3be"
                    weight="fill"
                />
                <Link href='' className="ml-7 w-[50px] h-[50px] rounded-full flex justify-center items-center bg-principal text-white text-xl">{Storage.getUser()?.name[0].toUpperCase()}</Link>
            </div>
        </div>
    )
}

export default Header