import { Modal, Select, message } from "antd"
import { useUserCreation } from "../../hooks/NavbarContext/useUserCreation"
import { useEffect, useState } from "react"
import ManagerRepository from "@/Repositories/ManagerRepository"
import { IForm } from "@/interfaces/Form"
import { UserRole } from "@/interfaces/User"

const UpdateUserModal = () => {
    const {
        id,
        accountName,
        name,
        active,
        formsIds,
        setUpdateUsersTable,
        setIsEditModalOpen,
        updateUsersTable,
        setFormsIds,
        isEditModalOpen,
        setName,
        setAccountName,
        setActive,
        role,
        email,
        setEmail
    } = useUserCreation()

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

            const response = await ManagerRepository.editEmployee(id!, {
                name: name?.trim(), 
                accountName: accountName?.trim(), 
                active: active,
                formsIds: formsIds as any,
                email
            })

            setUpdateUsersTable(!updateUsersTable)
            setIsEditModalOpen(false)

            message.success(response.data.message)
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setLoading(false)
        }
    }
    
    const handleOnChange = (values: Array<string>) => {
        setFormsIds(values)
    }

    return (
        <Modal 
                title="Editar Usuário"
                open={isEditModalOpen} 
                onOk={handleOnSubmit} 
                onCancel={e => setIsEditModalOpen(false)} 
                confirmLoading={loading}
                okText='Atualizar'
                okType='dashed'
                cancelText='Cancelar'
            >
                <form>
                    <label htmlFor="role">Função</label>
                    <input type="text" name="role" value={role === UserRole.employee ? 'Funcionário' : 'Gestor'} disabled className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                    { role === UserRole.employee ? (
                        <>
                            <label className="mb-1" htmlFor="accountName">Nome da Conta</label>
                            <input type="text" name="accountName" value={accountName} onChange={e => setAccountName(e.target.value)} className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                        </>
                    ) : (
                        <>
                            <label className="mb-1" htmlFor="email">Email do gestor</label>
                            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 rounded-lg p-3 mb-5 outline-none"/>
                        </>
                    ) }
                    <label htmlFor="active">Status</label>
                    <Select
                        placeholder="Selecione um Status"
                        onChange={e => setActive(e)}
                        style={{ width: '100%' }}
                        className="mb-5"
                        value={active}
                        options={[
                            {
                                label: 'Ativo',
                                value: true
                            },
                            {
                                label: 'Inativo',
                                value: false
                            }
                        ]}
                    />
                    { role === UserRole.employee && (
                        <>
                            <label className="mb-1" htmlFor="">Formulários permitidos ao usuário</label>
                            <Select
                                mode="multiple"
                                placeholder="Selecione Formulários"
                                onChange={handleOnChange}
                                style={{ width: '100%' }}
                                defaultValue={formsIds}
                                value={formsIds}
                                options={forms?.map(form => {
                                    return {
                                        label: form.title,
                                        value: form.id
                                    }
                                })}
                            />
                        </>
                    ) }
                </form>
            </Modal>
    )
}

export default UpdateUserModal