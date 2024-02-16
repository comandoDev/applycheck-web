import { Modal, Select, message } from "antd"
import { useEmployeeCreation } from "../../hooks/NavbarContext/useEmployeeCreation"
import { useEffect, useState } from "react"
import ManagerRepository from "@/Repositories/ManagerRepository"
import { IForm } from "@/interfaces/Form"

const UpdateUserModal = () => {
    const employeeCreationContext = useEmployeeCreation()

    const [forms, setForms] = useState<Array<IForm>>()
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

    const handleOnSubmit = async () => {
        try {
            setLoading(true)

            const response = await ManagerRepository.editEmployee(employeeCreationContext!.id!, {
                name: employeeCreationContext?.name, 
                email: employeeCreationContext?.email, 
                active: employeeCreationContext?.active,
                formsIds: employeeCreationContext?.formsIds
            })

            employeeCreationContext?.setUpdateUsersTable(!employeeCreationContext.updateUsersTable)
            employeeCreationContext?.setIsEditModalOpen(false)

            message.success(response.data.message)
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setLoading(false)
        }
    }
    
    const handleOnChange = (values: Array<string>) => {
        employeeCreationContext!.setFormsIds(values)
    }

    return (
        <Modal 
                title="Editar Usuário"
                open={employeeCreationContext?.isEditModalOpen} 
                onOk={handleOnSubmit} 
                onCancel={e => employeeCreationContext?.setIsEditModalOpen(false)} 
                confirmLoading={loading}
                okText='Atualizar'
                okType='dashed'
                cancelText='Cancelar'
            >
                <form>
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" name="name" value={employeeCreationContext!.name} onChange={e => employeeCreationContext!.setName(e.target.value)} className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={employeeCreationContext!.email} onChange={e => employeeCreationContext!.setEmail(e.target.value)} className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                    <label htmlFor="role">Função</label>
                    <input type="text" name="role" value='Funcionário' disabled className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                    <label className="mb-1" htmlFor="">Formulários permitidos ao usuário</label>
                    <Select
                        mode="multiple"
                        placeholder="Selecione Formulários"
                        onChange={handleOnChange}
                        style={{ width: '100%' }}
                        defaultValue={employeeCreationContext!.formsIds}
                        value={employeeCreationContext!.formsIds}
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

export default UpdateUserModal