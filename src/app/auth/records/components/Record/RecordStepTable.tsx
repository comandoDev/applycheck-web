import ActionPlanInputBox from "@/app/auth/forms/components/QuestionBox/QuestionBoxFooter/ActionPlanInputBox";
import { IRecordActionPlan, IRecordStep } from "@/interfaces/Record";
import { Image, Modal, Table } from "antd";
import { useState } from "react";

const RecordStepTable = ({ step }: { step: IRecordStep }) => {
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
            render: (_: any, { actionPlan }: { actionPlan: IRecordActionPlan }) => {
                return (actionPlan && <div onClick={() => modalInfo(actionPlan)} className="text-principal cursor-pointer w-full text-center">Ver</div>)
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

    const modalInfo = (actionPlan: IRecordActionPlan) => {
        Modal.info({
            title: 'Plano de Ação',
            okType: 'dashed',
            content: <>
                <div className="flex flex-col">
                    <div className="flex flex-col mb-3">
                        <span className="text-principal mb-1">O que será feito?</span>
                        <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.plan}</div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <span className="text-principal mb-1">Por que será feito?</span>
                        <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.reason}</div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <span className="text-principal mb-1">Onde será feito?</span>
                        <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.place}</div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <span className="text-principal mb-1">Quando será feito?</span>
                        <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{new Date(actionPlan.date!).toLocaleDateString('pt-br')}</div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <span className="text-principal mb-1">Quem fará?</span>
                        <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.workResponsible}</div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <span className="text-principal mb-1">Quanto custará?</span>
                        <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.price}</div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <span className="text-principal mb-1">Responsável?</span>
                        <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.generalResponsible}</div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <span className="text-principal mb-1">Notificar Gestores?</span>
                        <div className="pl-1 p-2 border border-zinc-250 rounded-lg">{actionPlan.notifyManagers ? 'Sim' : 'Não'}</div>
                    </div>
                </div>
            </>
        })
    }

    return (
        <>

            <Table dataSource={dataSource} columns={columns as any} className="shadow-xl" pagination={false} />
        </>
    )
}

export default RecordStepTable