import { Modal, Table, Tag, message } from "antd"
import { useEffect, useState } from "react";
import ManagerRepository from "@/Repositories/ManagerRepository";
import { useRouter } from "next/navigation";
import { IUser } from "@/interfaces/User";
import UsersTableSkeleton from "./UsersTableSkeleton";
import { useEmployeeCreation } from "../../hooks/NavbarContext/useEmployeeCreation";
import UpdateUserModal from "../Modals/UpdateUserModal";
import Storage from "@/utils/Storage";

const UsersTable = () => {
    const employeeCreationContext = useEmployeeCreation()

    const router = useRouter()
    
    const [employees, setEmployees] = useState<Array<IUser>>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)

        const fetch = async () => {
            try {
                const response = await ManagerRepository.listEmployees({
                    search: employeeCreationContext?.search
                })

                setEmployees(response.data.data?.users.docs)
            } catch (error) {
                router.push('/login/manager')
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [employeeCreationContext?.updateUsersTable, employeeCreationContext?.search])

    const handleEditOnClick = (user: Partial<IUser>) => {
        employeeCreationContext?.setIsEditModalOpen(true)

        employeeCreationContext!.setId(user.id!)
        employeeCreationContext!.setName(user.name!)
        employeeCreationContext!.setAccountName(user.accountName!)
        employeeCreationContext!.setActive(user.active!)
        user.formsIds!.map(formsIds => {
            if (formsIds.branchId === Storage.getBranchId()) {
                employeeCreationContext!.setFormsIds(formsIds.ids)
            }
        })
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
            employeeCreationContext?.setUpdateUsersTable(!employeeCreationContext.updateUsersTable)
        }
    }

    const dataSource = employees?.map(employee => {
        return {
            id: employee.id,
            name: employee.name, 
            accountName: employee.accountName,
            role: employee.role,
            active: employee.active,
            formsIds: employee.formsIds
        }
    })
      
    const columns = [
        {
            title: 'Nome Completo',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nome de Usuário',
            dataIndex: 'accountName',
            key: 'accountName',
        },
        {
            title: 'Função',
            dataIndex: 'role',
            key: 'role',
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