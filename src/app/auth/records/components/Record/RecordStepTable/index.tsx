import { IActionPlan } from "@/interfaces/ActionPlan";
import { IRecordStep } from "@/interfaces/Record";
import { Image, Modal, ModalFuncProps, Table, message } from "antd";
import ModalInfoContent from "./ModalInfoContent";
import { useState } from "react";
import ActionPlanRepository from "@/Repositories/ActionPlanRepository.ts";
import { useRouter } from "next/navigation";
import ActionPlanModal from "./ActionPlanModal";

const RecordStepTable = ({ step }: { step: IRecordStep }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [solved, setSolved] = useState<boolean>(false)

    let dataSource = [] as any

    step.fields.map(field => {
        if (field.fields) {
            field.fields.map(f => {
                dataSource.push({
                key: f.key,
                question: f.key,
                awnser: {
                    value: f.value,
                    nonCompliance: f.nonCompliance
                },
                observation: f.observation,
                actionPlan: f.actionPlan,
                files: f.files,
                nonCompliance: f.nonCompliance
            })
        })
        } else {
            dataSource.push({
                key: field.key,
                question: field.key,
                awnser: {
                    value: field.value,
                    nonCompliance: field.nonCompliance
                },
                observation: field.observation,
                actionPlan: field.actionPlan,
                files: field.files,
            })
        }
    })

    const columns = [
        {
            title: 'Questão',
            dataIndex: 'question',
            key: 'question'
        },
        {
            title: 'Resposta',
            dataIndex: 'awnser',
            key: 'awnser',
            render: (_: any, { awnser }: { awnser: any }) => {
                if (awnser.nonCompliance) return <span className="text-red-400 font-bold">{ awnser.value }</span>
                if (awnser) return awnser.value
            }
        },
        {
            title: 'Observação',
            dataIndex: 'observation',
            key: 'observation',
        },
        {
            title: 'Plano de Ação',
            dataIndex: 'actionPlan',
            key: 'actionPlan',
            render: (_: any, { actionPlan }: { actionPlan: IActionPlan }) => {
                return (actionPlan && <ActionPlanModal actionPlan={actionPlan} />)
            }
        },
        {
            title: 'Arquivo',
            dataIndex: 'files',
            key: 'files',
            render: (_: any, { files }: { files: Array<string> }) => {
                if (files?.length) {
                    return files.map(file => <div className="border border-zinc-300 shadow-xl pb-0 w-[50px] h-[50px] mt-2 mb-2"><Image width={50} height={50} src={`${file}`} /></div>)
                }
            }
        }
    ]

    return (
        <>
            <Table dataSource={dataSource} columns={columns as any} className="shadow-xl" pagination={false} />
        </>
    )
}

export default RecordStepTable