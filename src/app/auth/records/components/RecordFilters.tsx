import ManagerRepository from "@/Repositories/ManagerRepository"
import { IForm } from "@/interfaces/Form"
import { Select, message } from "antd"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { useRecordFiltersContext } from "../hooks/RecordFiltersContext/useRecordFilter"
import { apiServer } from "@/services/api"
import { IUser } from "@/interfaces/User"

const RecordFilters = () => {
    const recordFiltersContext = useRecordFiltersContext()

    const [loading, setLoading] = useState<boolean>(true)
    const [forms, setForms] = useState<Array<IForm>>()
    const [employees, setEmployees] = useState<Array<IUser>>()
    
    useEffect(() => {
        const fetch = async () => {
            try {
                const formsResponse = await ManagerRepository.listForms()
                const employeesResponse = await apiServer.get('/auth/users')
    
                const forms = formsResponse.data.data!.forms.docs 
                const employees = employeesResponse.data.data!.users.docs 
                
                setForms(forms)
                setEmployees(employees)
            } catch (error) {
                message.error((error as any).message)
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [])

    const handleFormOnChange = (formId: string) => {
        recordFiltersContext?.setFormId(formId)
    }

    const handleEmployeeOnChange = (employeeId: string) => {
        recordFiltersContext?.setEmployeeId(employeeId)
    }

    return (
        <div className="w-full flex">
            { loading ? (
                <div className="w-[175px] border flex justify-center items-center rounded-lg p-1">
                    <ClipLoader
                        color={'#1677FE'}
                        loading={loading}
                        size={25}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <>
                    <Select
                        defaultValue="Nome do Formulário"
                        onChange={handleFormOnChange}
                        className="mr-5"
                        options={forms?.map(form => {
                            return {
                                value: form.id,
                                label: form.title
                            }
                        })}
                    />
                    <Select
                        defaultValue="Nome do Funcionário"
                        onChange={handleEmployeeOnChange}
                        options={employees?.map(employee => {
                            return {
                                value: employee.id,
                                label: employee.name
                            }
                        })}
                    />
                </>
            )}
        </div>
    )
}

export default RecordFilters