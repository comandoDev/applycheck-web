'use client'

import { useEmployeeNavbar } from '@/app/auth/forms/hooks/NavbarContext/useEmployeeNavbar'
import { Bell, List } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

const Header = () => {
	const navbarContext = useEmployeeNavbar()

	const router = useRouter()

	const handleHamburguerClick = () => {
		navbarContext?.setShow(!navbarContext.show)
	}

	return (
		<div className="w-screen p-8 flex justify-between text-white font-bold fixed bg-principal rounded-bl-3xl rounded-br-3xl">
			<div className="flex items-center" onClick={() => router.push('/auth/forms')}>
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
