import ManagerRepository from "@/Repositories/ManagerRepository"
import { IForm } from "@/interfaces/Form"
import { Button, Select, message } from "antd"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { useRecordFiltersContext } from "../hooks/RecordFiltersContext/useRecordFilter"
import { apiServer } from "@/services/api"
import { IUser } from "@/interfaces/User"
import { FunnelSimple } from "@phosphor-icons/react"

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
    
    const handleDateOnChange = (date: string) => {
        recordFiltersContext?.setDate(date)
    }

    const handleHasNonComplianceOnChange = (nonCompliance: string) => {
        recordFiltersContext?.setNonCompliance(nonCompliance)
    }
    
    const handleClearOnClick = () => {
        recordFiltersContext?.setFormId(null)
        recordFiltersContext?.setEmployeeId(null)
        recordFiltersContext?.setDate(null)
        recordFiltersContext?.setNonCompliance(null)
    }

    const exportToExcel = async () => {
        const filters = {
            formId: recordFiltersContext?.formId,
            employeeId: recordFiltersContext?.employeeId,
            createdAt: recordFiltersContext?.date,
            hasNonCompliance: recordFiltersContext?.nonCompliance !== null ? recordFiltersContext?.nonCompliance : undefined
        }

        try {
            const response = await apiServer.get('/auth/records/export-excel', {
                params: filters,
                responseType: 'blob'
            })

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'AuditLis_Registros.xlsx')
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            message.error('Failed to export records to Excel')
        }
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
                <div className="flex items-center">
                    <FunnelSimple size={28} className="mr-5 text-principal" />
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
                    <Select
                        defaultValue="Possui Não conformidades"
                        className="ml-5"
                        onChange={handleHasNonComplianceOnChange}
                        options={[
                            {
                                label: 'Sim',
                                value: 'true'
                            },
                            {
                                label: 'Não',
                                value: 'false'
                            }
                        ]}
                    />
                    <div className="">
                        <input
                            type="date"
                            className="border border-zinc-300 rounded-lg ml-5 p-[5px] pl-2 pr-2 text-[14px] outline-0"
                            defaultValue="Nome do Funcionário"
                            onChange={e => handleDateOnChange(e.target.value)}
                        />
                    </div>
                    <Button className="ml-5" onClick={handleClearOnClick}>Limpar Filtros</Button>
                    <Button className="ml-5" onClick={exportToExcel}>Exportar Excel</Button>
                </div>
            )}
        </div>
    )
}

export default RecordFilters