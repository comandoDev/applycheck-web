'use client'

import { useNavbar } from '@/app/auth/forms/hooks/NavbarContext/useNavbar'
import { Bell, List } from '@phosphor-icons/react'

const Header = () => {
	const navbarContext = useNavbar()

	const handleHamburguerClick = () => {
		navbarContext?.setShow(!navbarContext.show)
	}

	return (
		<div className="w-screen bg-principal p-8 flex justify-between text-white font-bold fixed">
			<div className="flex items-center">
				FORMULÁRIOS
			</div>
			<div className="flex">
				<Bell size={32} className="mr-5"/>
				<List size={32} weight="fill" onClick={handleHamburguerClick} />
			</div>
		</div>
	)
}

export default Header
