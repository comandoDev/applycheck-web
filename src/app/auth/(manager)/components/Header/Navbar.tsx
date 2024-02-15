import Link from "next/link"
import { useRouter } from "next/navigation"
import { useManagerNavbar } from "../../hooks/NavbarContext/useManagerNavbar"
import { ManagerNavbarSelectedOption } from "../../hooks/NavbarContext/ManagerNavbarContext"

const Navbar = () => {
    const navbarContext = useManagerNavbar()

    const handleLiCLick = (selected: ManagerNavbarSelectedOption) => {
        navbarContext?.setSelected(selected)
    }


    const normalLiStyle = 'pb-7 pt-7 mr-5 text-zinc-500 font-medium'
    const selectedLiStyle = 'pb-7 pt-7 mr-5 border-b-2 border-principal text-principal'

    return (
        <nav>
            <ul className="flex">
                <li className={`${navbarContext?.selected === ManagerNavbarSelectedOption.records ? selectedLiStyle : normalLiStyle}`}>
                    <Link href='/auth/records' onClick={() => handleLiCLick(ManagerNavbarSelectedOption.records)}>Registros</Link>
                </li>
                <li className={`${navbarContext?.selected === ManagerNavbarSelectedOption.forms ? selectedLiStyle : normalLiStyle}`}>
                    <Link href='' onClick={() => handleLiCLick(ManagerNavbarSelectedOption.forms)}>Formulários</Link>
                </li>
                <li className={`${navbarContext?.selected === ManagerNavbarSelectedOption.employees ? selectedLiStyle : normalLiStyle}`}>
                    <Link href='/auth/employees' onClick={() => handleLiCLick(ManagerNavbarSelectedOption.employees)}>Funcionários</Link>
                </li>
                <li className={`${navbarContext?.selected === ManagerNavbarSelectedOption.config ? selectedLiStyle : normalLiStyle}`}>
                    <Link href='' onClick={() => handleLiCLick(ManagerNavbarSelectedOption.config)}>Configurações</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar