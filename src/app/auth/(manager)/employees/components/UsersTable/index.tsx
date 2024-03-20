import { Modal, Table, Tag, message } from "antd"
import { useEffect, useState } from "react";
import ManagerRepository from "@/Repositories/ManagerRepository";
import { useRouter } from "next/navigation";
import { IUser, UserRole } from "@/interfaces/User";
import UsersTableSkeleton from "./UsersTableSkeleton";
import UpdateUserModal from "../Modals/UpdateUserModal";
import Storage from "@/utils/Storage";
import { useUserCreation } from "../../hooks/NavbarContext/useUserCreation";

const UsersTable = () => {
    const {
        search,
        updateUsersTable,
        setIsEditModalOpen,
        setId,
        setName,
        setEmail,
        setRole,
        setAccountName,
        setActive,
        setFormsIds,
        setUpdateUsersTable
    } = useUserCreation()

    const router = useRouter()
    
    const [users, setUsers] = useState<Array<IUser>>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)

        const fetch = async () => {
            try {
                const response = await ManagerRepository.listEmployees({
                    search: search
                })

                setUsers(response.data.data?.users.docs)
            } catch (error) {
                router.push('/login/manager')
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [updateUsersTable, search])

    const handleEditOnClick = (user: Partial<IUser>) => {
        setIsEditModalOpen(true)

        setId(user.id!)
        setName(user.name!)
        setAccountName(user.accountName!)
        setEmail(user.email!)
        setRole(user.role!)
        setActive(user.active!)
        if (user.formsIds) {
            user.formsIds.map(formsIds => {
                if (formsIds.branchId === Storage.getBranchId()) {
                    setFormsIds(formsIds.ids)
                }
            })
        }
    }


    const handleOnDeleteOk = async (id: string) => {
        try {
            setLoading(true)

            const response = await ManagerRepository.deleteEmployee(id!)
            
            message.success(response.data.message)
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setLoading(false)
            setUpdateUsersTable(!updateUsersTable)
        }
    }

    const dataSource = users?.map(user => {
        return {
            id: user.id,
            name: user.name, 
            accountName: user.accountName,
            email: user.email,
            role: user.role,
            active: user.active,
            formsIds: user.formsIds
        }
    })
      
    const columns = [
        {
            title: 'Nome Completo',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nome da Conta',
            dataIndex: 'accountName',
            key: 'accountName',
            render: (_: any, { accountName }: { accountName: any }) => {
                return accountName || '-'
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_: any, { email }: { email: any }) => {
                return email || '-'
            }
        },
        {
            title: 'Função',
            dataIndex: 'role',
            key: 'role',
            render: (_: any, { role }: { role: any }) => {
                return role === UserRole.employee ? 'Funcionário' : 'Gestor'
            }
        },
        {
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            render: (_: any, { active }: { active: any }) => {
                let color = 'green'

                if (!active) color = 'red'
    
                return (
                    <Tag color={color} key={active}>
                        {active ? 'Ativo': 'Inativo'}
                    </Tag>
                )
            }
        },
        {
            title: 'Ação',
            dataIndex: '',
            key: 'x',
            render: (index: any) => {
                return (
                    <div className="flex">
                        <div className="mr-5 text-principal font-medium cursor-pointer hover:text-blue-800" onClick={e => handleEditOnClick(index)}>Editar</div>
                        <div onClick={e => {
                            warning(index.id)
                        }} className="text-[#f47b7b] font-medium cursor-pointer hover:text-red-600">Desativar</div>
                    </div>
                )
            },
        }
    ]

    const warning = (id: string) => {
        Modal.warning({
            title: 'Tem certeza que deseja desativar esse usuário ?',
            okText: 'Confirmar',
            okType: 'danger',
            onOk: () => handleOnDeleteOk(id)
        });
    }

    return loading ? (<UsersTableSkeleton />) : ( 
        <>
            <UpdateUserModal />
            <Table dataSource={dataSource} columns={columns} className="shadow-xl" />
        </>
     )

}

export default UsersTable