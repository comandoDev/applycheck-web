import { IRecord } from "@/interfaces/Record";
import { Table, Tag } from "antd"
import Link from "next/link";

const RecordsTable = ({ records }: { records: Array<IRecord> }) => {
    const dataSource = records?.map(record => {
        return {
            key: record.id,
            title: record.form?.title, 
            type: record.form?.type,
            employee: record.employee?.name,
            status: record.status,
            stepsNumber: record.form?.totalSteps,
            nonCompliance: record.nonComplianceCount,
            date: new Date(record.createdAt!).toLocaleDateString("pt-BR")
        }
    })
      
    const columns = [
        {
            title: 'Titúlo',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Funcionário',
            dataIndex: 'employee',
            key: 'employee',
        },
        {
            title: 'N.º Passos',
            dataIndex: 'stepsNumber',
            key: 'stepsNumber',
        },
        {
            title: 'Não conformidades',
            dataIndex: 'nonCompliance',
            key: 'nonCompliance',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, { status }: { status: any }) => {
                let color = ''

                if (status === 'aberto') color = 'green'
                if (status === 'analisando') color = 'geekblue'
                if (status === 'concluido') color = 'volcano'
    
                return (
                    <Tag color={color} key={status}>
                        {status}
                    </Tag>
                )
            },
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Ação',
            dataIndex: '',
            key: 'x',
            render: (index: any) => {
                return <Link href={`/auth/records/one?recordId=${index.key}`} className="text-principal">Analisar</Link>
            },
        },
    ];

    return <Table dataSource={dataSource} columns={columns} className="shadow-xl" />

}

export default RecordsTable