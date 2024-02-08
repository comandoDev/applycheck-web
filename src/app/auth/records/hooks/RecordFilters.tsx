'use client'

import ManagerRepository from "@/Repositories/ManagerRepository"
import { IForm } from "@/interfaces/Form"
import { Select, message } from "antd"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { useRecordFiltersContext } from "./RecordFiltersContext/useRecordFilter"

const RecordFilters = () => {
    const recordFiltersContext = useRecordFiltersContext()

    const [loading, setLoading] = useState<boolean>(true)
    const [forms, setForms] = useState<Array<IForm>>()
    
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await ManagerRepository.listForms()
    
                const forms = response.data.data!.forms.docs 
                setForms(forms)
            } catch (error) {
                message.error((error as any).message)
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [])

    const handleChange = (value: string) => {
        console.log('uhad ufhsdui')
        console.log({ value })
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
                <Select
                    defaultValue="Nome do Formulário"
                    style={{ width: 175 }}
                    onChange={e => handleChange(e)}
                    options={forms?.map(form => {
                        return {
                            value: form.id,
                            label: form.title
                        }
                    })}
                />
            )}
        </div>
    )
}

export default RecordFilters