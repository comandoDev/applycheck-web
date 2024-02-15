import { IRecord, RecordStatus } from "@/interfaces/Record";
import { Table, Tag } from "antd"
import Link from "next/link";
import { useRecordFiltersContext } from "../hooks/RecordFiltersContext/useRecordFilter";
import { useEffect, useState } from "react";
import ManagerRepository from "@/Repositories/ManagerRepository";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import RecordsTableSkeleton from "./Record/RecordsTableSkeleton";

const RecordsTable = () => {
    const router = useRouter()
    
    const recordFiltersContext = useRecordFiltersContext()
    
    const [records, setRecords] = useState<Array<IRecord>>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)

        const fetch = async () => {
            try {
                const recordsResponse = await ManagerRepository.listRecords({
                    formId: recordFiltersContext?.formId!,
                    employeeId: recordFiltersContext?.employeeId!,
                    
                })

                setRecords(recordsResponse.data.data?.records)
            } catch (error) {
                router.push('/login/manager')
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [recordFiltersContext?.formId, recordFiltersContext?.employeeId])

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
                return <Link href={`/auth/records/one?recordId=${index.key}`} className="text-principal">
                    <>
                        {index.status === RecordStatus.open ? 'Analisar' : 'Visualizar'}
                    </>
                </Link>
            },
        },
    ]

    return loading ? (<RecordsTableSkeleton />) : ( <Table dataSource={dataSource} columns={columns} className="shadow-xl" /> )

}

export default RecordsTable