import { SelectedOption } from "@/app/auth/forms/hooks/NavbarContext/NavbarContext"
import { useEmployeeNavbar } from "@/app/auth/forms/hooks/NavbarContext/useEmployeeNavbar"
import { ListChecks } from "@phosphor-icons/react"
import Link from "next/link"

const NavbarList = () => {
    const navbarContext = useEmployeeNavbar()

    const handleFormsClick = () => {
        navbarContext?.setSelected(SelectedOption.forms)
        navbarContext?.setShow(false)
    }

    const handleHistoricClick = () => {
        navbarContext?.setSelected(SelectedOption.historic)
        navbarContext?.setShow(false)
    }

    const normalLiStyle = 'bg-white p-3 text-principal'
    const selectedLiStyle = 'bg-principal text-white'

    return (
        <ul className="flex flex-col items-center w-full font-medium">
            <Link href='/auth/forms' className="w-5/6 mt-5">
                <li 
                    className={`flex items-center w-full p-3 rounded-lg ${navbarContext?.selected === SelectedOption.forms ? selectedLiStyle : normalLiStyle}`}
                    onClick={handleFormsClick}
                >
                    <ListChecks size={28} />
                        <span className="ml-3">FORMULÁRIOS</span>
                        </li>
            </Link>
            {/* <Link href='/auth/forms/historics' className="w-5/6 mt-5">
                <li 
                    className={`flex items-center w-full p-3 rounded-lg ${navbarContext?.selected === SelectedOption.historic ? selectedLiStyle : normalLiStyle}`}
                    onClick={handleHistoricClick}
                >
                    <ListNumbers size={28} />
                    <span className="ml-3">HISTÓRICOS</span>
                </li>
            </Link> */}
        </ul>
    )
}

export default NavbarList