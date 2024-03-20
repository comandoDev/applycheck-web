'use client'

import { Modal, Select, message } from "antd"
import { useUserCreation } from "../../hooks/NavbarContext/useUserCreation"
import { useEffect, useState } from "react"
import ManagerRepository from "@/Repositories/ManagerRepository"
import { IForm } from "@/interfaces/Form"
import Storage from "@/utils/Storage"
import { UserRole } from "@/interfaces/User"

const CreateUserModal = () => {
    const {
        isCreateModalOpen,
        setAccountName,
        setFormsIds,
        setIsCreateModalOpen,
        setName,
        setUpdateUsersTable,
        updateUsersTable,
        accountName,
        formsIds,
        name
    } = useUserCreation()

    const [forms, setForms] = useState<Array<IForm>>()
    const [email, setEmail] = useState<string>()
    const [role, setRole] = useState<UserRole>(UserRole.employee)
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
                name: name?.trim(),
                accountName: accountName?.trim(),
                formsIds: formsIds as any,
                role,
                email
            })

            setUpdateUsersTable(!updateUsersTable)
            setIsCreateModalOpen(false)
            setFormsIds([])

            setName('')
            setAccountName('')
            setFormsIds([])

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
            open={isCreateModalOpen} 
            onCancel={e => setIsCreateModalOpen(false)} 
            onOk={handleOnOkCLick}
            okText='Cadastrar'
            okType='dashed'
            cancelText='Cancelar'
            confirmLoading={loading}
        >
            <form>
                <label className="mb-1" htmlFor="role">Função</label>
                <Select
                    disabled={Storage.getUserRole() !== UserRole.admin}
                    placeholder="Selecione Formulários"
                    onChange={(role) => {
                        if (role === UserRole.employee) {
                            setEmail('')
                        } else {
                            setFormsIds([])
                            setAccountName('')
                        }

                        setRole(role as UserRole)
                    }}
                    style={{ width: '100%' }}
                    value={role}
                    className="mb-5"
                    options={[
                        {
                            label: 'Funcionário',
                            value: UserRole.employee
                        },
                        {
                            label: 'Gestor',
                            value: UserRole.manager
                        },
                    ]}
                />
                <label className="mb-1" htmlFor="name">Nome Completo</label>
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
                { role !==  UserRole.manager && (
                    <>
                        <label className="mb-1" htmlFor="">Formulários permitidos ao usuário</label>
                        <Select
                            mode="multiple"
                            placeholder="Selecione Formulários"
                            onChange={handleOnChange}
                            style={{ width: '100%' }}
                            value={formsIds}
                            className="mb-5"
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

export default CreateUserModal