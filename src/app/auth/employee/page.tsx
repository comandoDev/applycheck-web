'use client'

import { useEffect, useState } from 'react'
import FormBox from '../forms/components/FormBox'
import ListSelector from './components/ListSelector'
import { FormType, IForm } from '@/interfaces/Form'
import EmployeeRepository from '@/Repositories/EmployeeRepository'
import FormList from '../forms/components/FormList'
import { useRouter } from 'next/navigation'
import { IRecord } from '@/interfaces/Record'
import Storage from '@/utils/Storage'

const Home = () => {
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

        const inProgressResponse = await EmployeeRepository.hasRecordInProgress()
        
        const record = inProgressResponse.data.data?.record

        setRecordInProgress(record)

        if (record) {
          Storage.setLastReachedStep(record.lastReachedStep!)
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
        { loading ? 'Loading' : (
            <FormList 
            forms={forms}
            inProgressId={recordInProgress?.formId}
          />
        ) }
    </>
  )
}

export default Home
