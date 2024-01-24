'use client'

import ManagerRepository from "@/Repositories/ManagerRepository"
import RecordTable from "@/app/auth/records/components/Record/RecordStepTable"
import { IRecord } from "@/interfaces/Record"
import { Progress, Steps, Tabs, Tooltip } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import RecordStatisticsList from "../components/Record/RecordStatisticsList"
import ReactApexChart from "react-apexcharts"
import RecordNonCompliancesChart from "../components/Record/RecordNonCompliancesChart"

const RecordPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [record, setRecord] = useState<IRecord>()

    useEffect(() => {
        const recordId = searchParams.get('recordId')
        if (!recordId) return router.push('/login/manager')

        const fetch = async () => {
            const response = await ManagerRepository.getOneRecord(recordId)

            const record = response.data.data?.record 
            setRecord(record)
        }

        fetch()  
    }, [])

    return (
        <div className="pl-24 pr-24 pt-10 pb-10 bg-[#f8fafc]">
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
    )
}

export default RecordPage