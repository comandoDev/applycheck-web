'use client'

import { PlusCircle } from "@phosphor-icons/react"
import UsersTable from "./components/UsersTable"
import { useEmployeeCreation } from "./hooks/NavbarContext/useEmployeeCreation"
import CreateUserModal from "./components/Modals/CreateUserModal"

const Employees = () => {
    const employeeCreationContext = useEmployeeCreation()
    
    return (
        <div className=" pl-24 pr-24 pt-10 pb-10 mt-20">
            <div className="mb-10">
                <h1 className="font-bold text-3xl text-zinc-700">Lista de Usuários</h1>
            </div>

            <div>
                <div className="flex justify-between mb-3">
                    <input 
                        className="w-[35%] p-3 rounded-xl outline-0 border-0 shadow-lg" 
                        placeholder="Buscar Usuário..." 
                        onChange={e => employeeCreationContext?.setSearch(e.target.value)}
                    />
                    <PlusCircle size={36} onClick={() => employeeCreationContext?.setIsCreateModalOpen(true)} className="cursor-pointer text-principal hover:text-blue-700" />
                </div>
                <UsersTable />
            </div>

            <CreateUserModal />            
        </div>
    )
}

export default Employees