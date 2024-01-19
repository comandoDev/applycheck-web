'use client'

import { IForm } from "@/interfaces/Form"
import FormBox from "./FormBox"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IRecord } from "@/interfaces/Record"
import EmployeeRepository from "@/Repositories/EmployeeRepository"
import { useForm } from "../hooks/FormContext/useForm"
import to from "await-to-js"

const FormList = () => {
  const formContext = useForm()

  const router = useRouter()

  const [forms, setForms] = useState<Array<IForm>>([])
  const [recordInProgress, setRecordInProgress] = useState<IRecord>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)

    const fetch = async () => {
      try {
        const formsResponse = await EmployeeRepository.listForms()
        setForms(formsResponse.data.data!.forms.docs)

        const [error, inProgressResponse] = await to(EmployeeRepository.hasRecordInProgress())
        
        if (!error) {
          const record = inProgressResponse.data.data?.record

          if (record) {
            setRecordInProgress(record)
            formContext?.setLastReachedStep(record.lastReachedStep!)
            await formContext?.findFormById(record.formId)
            formContext?.setRecord(record)
          }
        }

        setLoading(false)
      } catch (error) {
        router.push('/login')
      }
    } 

    fetch()
  }, [])
  
  return (
    <>
      { !loading ? (
        <>
          { forms.map(form => {
            return <FormBox 
              id={form.id!}
              title={form.title}
              type={form.type}
              description={form.description}
              inProgressId={recordInProgress?.formId}
              key={form.id}
            />
          }) }
        </>
      ) : 'LOADING' }
    </>
  )
}

export default FormList