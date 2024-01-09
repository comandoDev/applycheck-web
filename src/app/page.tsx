'use client'

import { useEffect } from 'react'

import EmployeeRepository from '@/Repositories/EmployeeRepository'

export default function Home () {
  useEffect(() => {
    const fetch = async () => {
      const response = await EmployeeRepository.updateRecordStep('asjd', {
        fields: [],
        order: 1,
        title: 'asdfd'
      })

      console.log({ response })
    }

    fetch()
  })

  return (
    <h1 className={'text-3xl font-bold underline'}>Heyy</h1>
  )
}
