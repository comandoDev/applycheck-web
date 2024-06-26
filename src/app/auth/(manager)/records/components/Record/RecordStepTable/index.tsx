import { IActionPlan } from "@/interfaces/ActionPlan";
import { IRecordStep } from "@/interfaces/Record";
import { Image, Table } from "antd";
import ActionPlanModal from "./ActionPlanModal";
import { InputType } from "@/interfaces/Form";

const RecordStepTable = ({ step }: { step: IRecordStep }) => {
    let dataSource = [] as any

    step.fields.map(field => {
        if (field.fields) {
            field.fields.map(f => {
                dataSource.push({
                key: f.key,
                question: `${field.key} - ${f.key}`,
                awnser: {
                    value: f.value,
                    nonCompliance: f.nonCompliance,
                    type: f.type
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
                    nonCompliance: field.nonCompliance,
                    type: field.type
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
                if (awnser.type === InputType.signature) return (
                    <div className="border border-zinc-300 shadow-xl pb-0 w-[50px] h-[50px] mt-2 mb-2">
                        <Image width={50} height={50} src={`${awnser.value}`} />
                    </div>
                )

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