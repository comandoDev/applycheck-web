import { Bell, List, SignOut } from '@phosphor-icons/react'

const Header = () => {
	return (
		<div className="w-screen bg-principal p-8 flex justify-between text-white font-bold fixed">
			<div className="flex items-center">
				FORMULÁRIOS
			</div>
			<div className="flex">
				<Bell size={32} className="mr-5"/>
				<List size={32} weight="fill" />
			</div>
		</div>
	)
}

export default Header
