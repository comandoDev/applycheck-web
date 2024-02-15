'use client'

import { IRecord, IRecordStep } from "@/interfaces/Record"
import RecordStatisticsbox, { IRecordStatisticsboxStatus, IRecordStatisticsboxType } from "./RecordStatisticsbox"
import { useEffect, useState } from "react"
import { apiServer } from "@/services/api"
import { message } from "antd"

const RecordStatisticsList = ({ record }: { record: IRecord }) => {
    const [actionPlansCount, setActionPlansCount] = useState<number>()
    const [fieldsCount, setFieldsCount] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)

    const calculateFieldsCount = (steps: Array<IRecordStep>) => {
        return steps.reduce((count, step) => {
            count += step.fields.length
    
            step.fields.forEach((field) => {
                if (field.fields) {
                    count--
                    count += field.fields.length
                }
            })
    
            return count
        }, 0)
    }

    useEffect(() => {
        setLoading(true)

        const fetch = async () => {
            try {
                const response = await apiServer.get('/auth/action-plans', {
                    params: {
                        solved: false,
                        recordId: record.id
                    }
                })

                setActionPlansCount(response.data.data.actionPlans.totalDocs)
            } catch (error) {
                message.error((error as any).message)
            } finally {
                setLoading(false)
            }
        }

        fetch()

        if (record?.steps) {
            const calculatedFieldsCount = calculateFieldsCount(record.steps)
            setFieldsCount(calculatedFieldsCount)
        }
    }, [record?.steps])


    return (
        <div className="mb-10 mt-10 w-full flex justify-center">
            <RecordStatisticsbox 
                title="PREENCHIMENTO"
                progress={{
                    color: 'green',
                    title: `${fieldsCount} campo(s) preechidos`,
                    info: 'Campos preenchidos'
                }}
                status={IRecordStatisticsboxStatus.success}
                type={IRecordStatisticsboxType.circle}
                percent={Math.round((record?.lastReachedStep!/record?.form?.totalSteps!) * 100)}
            />
            <RecordStatisticsbox 
                title="NÃO CONFORMIDADES"
                progress={{
                    color: 'red',
                    title: `${record?.nonComplianceCount!} campo(s) com não conformidades`,
                    info: 'Campos que apresentam não conformidades'
                }}
                status={IRecordStatisticsboxStatus.exception}
                type={IRecordStatisticsboxType.circle}
                percent={Math.round((record?.nonComplianceCount!/fieldsCount!) * 100)}
            />
            <RecordStatisticsbox 
                title="CONFORMIDADES"
                progress={{
                    color: 'green',
                    title: `${(fieldsCount! - record.nonComplianceCount!)} campo(s) em conformidade`,
                    info: 'Campos em conformidade'
                }}
                status={IRecordStatisticsboxStatus.success}
                type={IRecordStatisticsboxType.circle}
                percent={Math.round(((fieldsCount! - record?.nonComplianceCount!)/fieldsCount!) * 100)}
            />
            <RecordStatisticsbox 
                title="PLANOS DE AÇÃO EM ABERTO"
                progress={{
                    color: 'blue',
                    title: `${actionPlansCount} plano(s) de ação em aberto`,
                    info: 'Planos de Ação em aberto'
                }}
                status={IRecordStatisticsboxStatus.active}
                type={IRecordStatisticsboxType.dashboard}
                percent={100}
                rawNumber={actionPlansCount}
                lastOne={true}
                loading={loading}
            />
        </div>
    )
}

export default RecordStatisticsList