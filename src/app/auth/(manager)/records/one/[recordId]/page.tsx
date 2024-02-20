'use client'

import ManagerRepository from "@/Repositories/ManagerRepository"
import { IRecord, RecordStatus } from "@/interfaces/Record"
import { Steps, Tabs, message } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import RecordStatisticsList from "../../components/Record/RecordStatisticsList"
import RecordNonCompliancesChart from "../../components/Record/RecordNonCompliancesChart"
import PageLoading from "../../components/Record/PageLoading"
import { getFormattedDate } from "../../helpers/getFormattedDate"
import RecordStepTable from "../../components/Record/RecordStepTable"
import { ClipLoader } from "react-spinners"
import { FilePdf } from "@phosphor-icons/react"

const RecordPage = ({ params }: { params: { recordId: string } }) => {
    const router = useRouter()

    const [record, setRecord] = useState<IRecord>()
    const [loading, setLoading] = useState<boolean>(true)
    const [concluedLoading, setConcluedLoading] = useState<boolean>(false)
    const [PDFLoading, setPDFLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)

        const fetch = async () => {
            try {
                const response = await ManagerRepository.getOneRecord(params.recordId)
    
                const record = response.data.data?.record 
                setRecord(record)

                if (record?.status === RecordStatus.open) await ManagerRepository.analyzeRecord(params.recordId)
            } catch (error) {
                router.push('/login/manager')
            } finally {
                setLoading(false)
            }
        }

        fetch()  
    }, [])

    const handleConcluedOnClick = async () => {
        try {
            setConcluedLoading(true)

            const response = await ManagerRepository.concluedRecord(record?.id!)
        
            message.success(response.data.message)

            router.push('/auth/records')
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setConcluedLoading(false)
        }
    }

    const handlePDFOnClick = async () => {
        try {
            setPDFLoading(true)

            const response = await ManagerRepository.generateRecordPDF(record?.id!)

            const pdfUrl = response.data.data?.pdf!

            downloadPDF(pdfUrl)
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setPDFLoading(false)
        }
    }

    const downloadPDF = (pdfUrl: string) => {
        const link = document.createElement('a')
        
        link.href = pdfUrl
        link.download = 'seu_arquivo.pdf'
        link.style.display = 'none'
        
        document.body.appendChild(link)
        
        link.click()
        
        document.body.removeChild(link)
    }

    return !loading ? (
        <div className="pl-24 pr-24 pt-10 pb-10 mt-20">
            <div className="flex justify-between">
                <div>
                    <h1 className="font-bold text-2xl text-zinc-700">{`${record?.form?.title} (${record?.employee?.name})`}</h1>
                    <h2 className="font-bold text-1xl text-zinc-600">{record?.form?.type}</h2>
                </div>
                <div className="flex">
                    { record && (
                        <div className="mr-5">
                            <div 
                                className="flex items-center justify-center w-40 p-3 bg-red-500 rounded-lg text-white font-bold cursor-pointer hover:bg-red-600"
                                onClick={handlePDFOnClick}    
                            >
                                { PDFLoading ? (
                                    <ClipLoader
                                        color='white'
                                        loading={PDFLoading}
                                        size={24}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                ): (<FilePdf size={24} />) }
                            </div>
                        </div>
                    ) }
                    { (record?.status === RecordStatus.analysing) && (
                        <div>
                            <div 
                                onClick={handleConcluedOnClick}
                                className="flex items-center justify-center w-40 p-3 bg-red-500 rounded-lg text-white font-bold cursor-pointer hover:bg-red-600">
                                { concluedLoading ? (
                                    <ClipLoader
                                        color='white'
                                        loading={concluedLoading}
                                        size={24}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                ) : <>Concluir</>}
                            </div>
                            
                        </div>
                    ) }
                </div>
            </div>
            { record && (
                <RecordStatisticsList record={record} />
            ) }
            <div className="w-full bg-white shadow-xl p-5 mb-10">
                <RecordNonCompliancesChart record={record!} />              
            </div>
            <div className="mb-10">
                <Steps
                    className="mb-5 mt-5"
                    current={1}
                    items={record?.form?.steps.map(step => {
                        return {
                            title: `Etapa-${step.order}`,
                            status: record?.steps![(step.order - 1)] ? 'finish' : 'wait',
                            description: (record.endTime && step.order === record.form?.totalSteps) ? 
                                getFormattedDate(record.endTime, true) : (step.order === 1 ? getFormattedDate(record.createdAt!) : '')
                        }
                    })}
                />
            </div>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='left'
                    items={record?.steps!.map((step) => {
                        return {
                            label: step.title,
                            key: step.order,
                            children: <RecordStepTable step={step} />
                        }
                    }) as any}
                />
            </div>
        </div>
    ) : <PageLoading />
}

export default RecordPage