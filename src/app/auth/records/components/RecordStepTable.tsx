import { IRecordStep } from "@/interfaces/Record";
import { Image, Table } from "antd";

const RecordStepTable = ({ step }: { step: IRecordStep }) => {
    const dataSource =  step.fields.map(field => {
        return {
            key: field.key,
            question: field.key,
            awnser: field.value,
            observation: field.observation,
            actionPlan: field.actionPlan,
            file: field.file,
            nonCompliance: field.nonCompliance
        }
    })

        const columns = [
        {
            title: 'Questão',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Resposta',
            dataIndex: 'awnser',
            key: 'awnser',
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
        },
        {
            title: 'Arquivo',
            dataIndex: 'file',
            key: 'file',
            render: (_, { file }) => {
                if (file) return <Image width={35} src={`${file}`} />
            }
        }
    ]

    return <Table dataSource={dataSource} columns={columns} className="shadow-xl" pagination={false} />
}

export default RecordStepTable