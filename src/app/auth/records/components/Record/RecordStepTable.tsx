import { IRecordStep } from "@/interfaces/Record";
import { Image, Table } from "antd";

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
                file: f.file,
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
                file: field.file,
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
            key: 'actionPlan'
        },
        {
            title: 'Arquivo',
            dataIndex: 'file',
            key: 'file',
            render: (_: any, { file }: { file: any }) => {
                if (file) return <Image width={40} src={`${file}`} />
            }
        }
    ]

    return <Table dataSource={dataSource} columns={columns as any} className="shadow-xl" pagination={false} />
}

export default RecordStepTable