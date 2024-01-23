'use client'

import ManagerRepository from "@/Repositories/ManagerRepository"
import RecordTable from "@/app/auth/records/components/RecordStepTable"
import { IRecord } from "@/interfaces/Record"
import { Progress, Steps, Tabs, Tooltip } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

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
            console.log({ record })
            console.log(record?.lastReachedStep/record?.form?.totalSteps, record?.lastReachedStep, record?.form?.totalSteps)
            setRecord(record)
        }

        fetch()        
    }, [])

    return (
        <div className="pl-24 pr-24 pt-10 pb-10 bg-zinc-50">
            {/* <Steps
                size="small"
                current={record?.lastReachedStep}
                items={record?.steps?.map(step => {
                    return { title: step.title }
                })}
            /> */}

            <div>
                <h1 className="font-bold text-2xl text-zinc-700">{`${record?.form?.title} (${record?.employee?.name})`}</h1>
                <h2 className="font-bold text-1xl text-zinc-600">{record?.form?.type}</h2>
            </div>
            <div className="mb-10 mt-10 w-full flex justify-center">
                <div className="p-7 bg-white shadow-xl flex flex-col rounded-xl">
                    <span className="font-bold mb-8">Não conformidades</span>
                    <div className="w-full flex justify-center">
                        <Tooltip title={`${record?.nonComplianceCount} não conformes`}>
                            <Progress type='circle' status="exception" percent={60} success={{ percent: 30 }} format={(percent) => `${percent}%`} />
                        </Tooltip>
                    </div>
                    <div>

                    </div>
                </div>
                <Progress type="circle" status="success" percent={(record?.lastReachedStep!/record?.form?.totalSteps!) * 100} format={(percent) => `${percent}%`} />
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
                    })}
                />
            </div>
        </div>
    )
}

export default RecordPage