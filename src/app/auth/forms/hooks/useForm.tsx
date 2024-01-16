'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { IFormContext } from './formContext';
import EmployeeRepository from '@/Repositories/EmployeeRepository';
import { message } from 'antd';
import { IFilledField, IRecord, IRecordStep } from '@/interfaces/Record';
import { FormType, IForm, InputType } from '@/interfaces/Form';

const FormContext = createContext<IFormContext | null>(null)

export const FormContextProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<IForm>()
  const [record, setRecord] = useState<IRecord>()
  const [lastReachedStep, setLastReachedStep] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<IRecordStep>()
  const [filledFields, setFilledFields] = useState<Array<IFilledField>>()

  const findFormById = async (formId: string): Promise<void> => {
    try {
      const response = await EmployeeRepository.getOneForm(formId)
      setForm(response.data.data!.form)
    } catch (error) {
      message.error((error as any).message)
    }
  }

  const findRecordAndSetFilledFields = async (stepOrder: number): Promise<void> => {
    const response = await EmployeeRepository.getOneRecord(record?.id!)
    
    const step = response.data.data?.record?.steps?.find(step => step.order === stepOrder)

    if (step) {
        const filledValues = step.fields.map(field => {
            return {
                key: field.key,
                value: field.value!,
                actionPlan: field.actionPlan,
                observation: field.observation,
                file: field.file
            }
        })

        setFilledFields(filledValues)
    }
  }

  const isRecordFinished = async (): Promise<boolean> => {
    let isFinished = false

    if (lastReachedStep === (form?.totalSteps! - 1)) {
      await EmployeeRepository.updateRecordStep(
          record?.id!,
          currentStep!
      )

      await EmployeeRepository.finishRecord(record?.id!)

      setLastReachedStep(0)
      setForm(undefined)

      message.success('Checagem concluida com sucesso!')
  
      isFinished = true
    }

    return isFinished
  }

  const formContextProvider = {
    form,
    setForm,
    record,
    setRecord,
    findFormById,
    lastReachedStep,
    setLastReachedStep,
    currentStep,
    setCurrentStep,
    filledFields,
    setFilledFields,
    findRecordAndSetFilledFields,
    isRecordFinished
  }

  return (
    <FormContext.Provider value={formContextProvider}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => useContext(FormContext)