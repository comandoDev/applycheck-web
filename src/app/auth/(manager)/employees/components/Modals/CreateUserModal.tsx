'use client'

import { Modal, Select, message } from "antd"
import { useEmployeeCreation } from "../../hooks/NavbarContext/useEmployeeCreation"
import { useEffect, useState } from "react"
import ManagerRepository from "@/Repositories/ManagerRepository"
import { IForm } from "@/interfaces/Form"

const CreateUserModal = () => {
    const employeeCreationContext = useEmployeeCreation()

    const [forms, setForms] = useState<Array<IForm>>()
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [formsIds, setFormsIds] = useState<Array<string>>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await ManagerRepository.listForms()

                setForms(response.data.data?.forms.docs)
            } catch (error) {
                message.error((error as any).message)
            } 
        }

        fetch()
    }, [])

    const handleOnChange = (values: Array<string>) => {
        setFormsIds(values)
    }

    const handleOnOkCLick = async () => {
        try {
            setLoading(true)

            const response = await ManagerRepository.createEmployee({
                name,
                email,
                formsIds
            })

            employeeCreationContext?.setUpdateUsersTable(!employeeCreationContext.updateUsersTable)
            employeeCreationContext?.setIsCreateModalOpen(false)

            message.success(response.data.message)
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal 
                title="Cadastrar Usuário"
                open={employeeCreationContext?.isCreateModalOpen} 
                onCancel={e => employeeCreationContext?.setIsCreateModalOpen(false)} 
                onOk={handleOnOkCLick}
                okText='Cadastrar'
                okType='dashed'
                cancelText='Cancelar'
                confirmLoading={loading}
            >
                <form>
                    <label className="mb-1" htmlFor="name">Nome Completo</label>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                    <label className="mb-1" htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                    <label className="mb-1" htmlFor="role">Função</label>
                    <input type="text" name="role" value='Funcionário' disabled className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                    <label className="mb-1" htmlFor="">Formulários permitidos ao usuário</label>
                    <Select
                        mode="multiple"
                        placeholder="Selecione Formulários"
                        onChange={handleOnChange}
                        style={{ width: '100%' }}
                        options={forms?.map(form => {
                            return {
                                label: form.title,
                                value: form.id
                            }
                        })}
                    />
                </form>
        </Modal>
    )
}

export default CreateUserModal