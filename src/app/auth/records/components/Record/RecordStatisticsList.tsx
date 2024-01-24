'use client'

import { IRecord, IRecordStep } from "@/interfaces/Record"
import RecordStatisticsbox, { IRecordStatisticsboxStatus, IRecordStatisticsboxType } from "./RecordStatisticsbox"
import { useEffect, useState } from "react"

const RecordStatisticsList = ({ record }: { record: IRecord }) => {
    const [fieldsCount, setFieldsCount] = useState<number>();

    const calculateFieldsCount = (steps: Array<IRecordStep>) => {
        return steps.reduce((count, step) => {
            count += step.fields.length;
    
            step.fields.forEach((field) => {
                if (field.fields) {
                    count--;
                    count += field.fields.length;
                }
            });
    
            return count;
        }, 0);
    };

    useEffect(() => {
        if (record?.steps) {
            const calculatedFieldsCount = calculateFieldsCount(record.steps);
            setFieldsCount(calculatedFieldsCount);
        }
    }, [record?.steps]);


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
                title="MÉDIA DE NC POR PASSO"
                progress={{
                    color: 'blue',
                    title: `Média de ${Math.round(record?.nonComplianceCount!/record?.form?.totalSteps!)} 
                    campo(s) com não conformidade por passo`,
                    info: 'Média de campos com não conformidades por passo'
                }}
                status={IRecordStatisticsboxStatus.active}
                type={IRecordStatisticsboxType.dashboard}
                percent={100}
                rawNumber={Math.round(record?.nonComplianceCount!/record?.form?.totalSteps!)}
                lastOne={true}
            />
        </div>
    )
}

export default RecordStatisticsList