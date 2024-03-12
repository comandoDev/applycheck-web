import { IRecord, RecordStatus } from "@/interfaces/Record";
import { Modal, Table, Tag, message } from "antd"
import Link from "next/link";
import { useRecordFiltersContext } from "../hooks/RecordFiltersContext/useRecordFilter";
import { useEffect, useState } from "react";
import ManagerRepository from "@/Repositories/ManagerRepository";
import { useRouter } from "next/navigation";
import RecordsTableSkeleton from "./Record/RecordsTableSkeleton";

const RecordsTable = () => {
    const router = useRouter()
    
    const recordFiltersContext = useRecordFiltersContext()
    
    const [records, setRecords] = useState<Array<IRecord>>()
    const [totalDocs, setTotalDocs] = useState<number>()
    const [loading, setLoading] = useState<boolean>(true)
    const [changePageLoading, setChangePageLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)

        const fetch = async () => {
            try {
                const recordsResponse = await ManagerRepository.listRecords({
                    formId: recordFiltersContext?.formId!,
                    employeeId: recordFiltersContext?.employeeId!,
                    createdAt: recordFiltersContext?.date!,
                    hasNonCompliance: recordFiltersContext?.nonCompliance ? recordFiltersContext?.nonCompliance! : undefined,
                })

                const recordPaginate = recordsResponse.data.data?.records

                setRecords(recordPaginate?.docs)
                setTotalDocs(recordPaginate?.totalDocs)
            } catch (error) {
                router.push('/login/manager')
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [
        recordFiltersContext?.formId, 
        recordFiltersContext?.employeeId, 
        recordFiltersContext?.date,
        recordFiltersContext?.nonCompliance,
        recordFiltersContext?.reloadData
    ])

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

    const handleOnDeleteOk = async (recordId: string) => {
        try {
            setLoading(true)

            const response = await ManagerRepository.deleteRecord(recordId)

            message.success(response.data.message)
            recordFiltersContext?.setReloadData(!recordFiltersContext.reloadData)
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setLoading(false)
        }
    }

    const handleTablePageOnChange = async (page: number) => {
        try {
            setChangePageLoading(true)

            const recordsResponse = await ManagerRepository.listRecords({
                formId: recordFiltersContext?.formId!,
                employeeId: recordFiltersContext?.employeeId!,
                createdAt: recordFiltersContext?.date!,
                hasNonCompliance: recordFiltersContext?.nonCompliance ? recordFiltersContext?.nonCompliance! : undefined,
                page
            })

            setRecords(recordsResponse.data.data?.records.docs)
        } catch (error) {
            router.push('/login/manager')
        } finally {
            setChangePageLoading(false)
        }
    } 

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
                return (
                    <div className="flex">
                        <Link href={`/auth/records/one/${index.key}`} className="text-principal mr-5">
                            <>
                                {index.status === RecordStatus.open ? 'Analisar' : 'Visualizar'}
                            </>
                        </Link>
                        <div onClick={e => warning(index.key)} className="text-[#f47b7b] font-medium cursor-pointer hover:text-red-600">Remover</div>
                    </div>
                )
            },
        },
    ]

    const warning = (id: string) => {
        Modal.warning({
            title: 'Tem certeza que deseja remover esse registro ?',
            okText: 'Confirmar',
            okType: 'danger',
            onOk: () => handleOnDeleteOk(id)
        });
    }

    return loading ? (<RecordsTableSkeleton />) : ( <Table 
        pagination={{
            total: totalDocs,
            pageSize: 10,
            showSizeChanger: true
        }}
        loading={changePageLoading}
        dataSource={dataSource}
        columns={columns}
        className="shadow-xl"
        onChange={e => handleTablePageOnChange(e.current!)} />
            
    )

}

export default RecordsTable