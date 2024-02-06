'use client'

import ManagerRepository from "@/Repositories/ManagerRepository"
import RecordTable from "@/app/auth/records/components/Record/RecordStepTable"
import { IRecord, RecordStatus } from "@/interfaces/Record"
import { Steps, Tabs } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import RecordStatisticsList from "../components/Record/RecordStatisticsList"
import RecordNonCompliancesChart from "../components/Record/RecordNonCompliancesChart"
import PageLoading from "../components/Record/PageLoading"

const RecordPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [record, setRecord] = useState<IRecord>()
    const [loading, setLoading] = useState<boolean>(true)

    const getFormattedTime = (stringDate: Date) => {
        const date = new Date(stringDate)

        const hour = date.getHours();
        const minutes = date.getMinutes();

        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHour}:${formattedMinutes}`
    }

    useEffect(() => {
        setLoading(true)

        const recordId = searchParams.get('recordId')
        if (!recordId) return router.push('/login/manager')

        const fetch = async () => {
            try {
                const response = await ManagerRepository.getOneRecord(recordId)
    
                const record = response.data.data?.record 
                setRecord(record)

                if (record?.status === RecordStatus.open) await ManagerRepository.analyzeRecord(recordId)
            } catch (error) {
                router.push('/login/manager')
            } finally {
                setLoading(false)
            }
        }

        fetch()  
    }, [])

    return !loading ? (
        <div className="pl-24 pr-24 pt-10 pb-10 mt-20">
            <div>
                <h1 className="font-bold text-2xl text-zinc-700">{`${record?.form?.title} (${record?.employee?.name})`}</h1>
                <h2 className="font-bold text-1xl text-zinc-600">{record?.form?.type}</h2>
            </div>
            { record && (
                <RecordStatisticsList record={record} />
            ) }
            <div className="w-full bg-white shadow-xl p-5 mb-10">
                <RecordNonCompliancesChart record={record!} />              
            </div>
            <div className="mb-10">
                <Steps
                    className="mb-5 mt-5"
                    current={1}
                    items={record?.form?.steps.map(step => {
                        return {
                            title: `Etapa-${step.order}`,
                            status: record?.steps![(step.order - 1)] ? 'finish' : 'wait',
                            description: (record.endTime && step.order === record.form?.totalSteps) ? 
                                getFormattedTime(record.endTime) : (step.order === 1 ? getFormattedTime(record.createdAt!) : '')
                        }
                    })}
                />
            </div>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='left'
                    items={record?.steps!.map((step) => {
                        return {
                            label: step.title,
                            key: step.order,
                            children: <RecordTable step={step} />
                        }
                    }) as any}
                />
            </div>
        </div>
    ) : <PageLoading />
}

export default RecordPage