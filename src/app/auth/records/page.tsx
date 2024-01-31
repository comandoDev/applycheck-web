'use client'

import ManagerRepository from "@/Repositories/ManagerRepository"
import { IRecord } from "@/interfaces/Record"
import { useEffect, useState } from "react"
import RecordsTable from "./components/RecordsTable"
import ChartBox from "./components/ChartBox"
import { useRouter } from "next/navigation"
import PageLoading from "./components/Record/PageLoading"
import { MagnifyingGlass } from "@phosphor-icons/react"

const Records = () => {
    const router = useRouter()

    const [records, setRecords] = useState<Array<IRecord>>()
    const [nonComplianceCount, setNonComplianceCount] = useState<number>()
    const [registerWithNonComplianceCount, setRegisterWithNonComplianceCount] = useState<number>()
    const [registerWithoutNonComplianceCount, setRegisterWithoutNonComplianceCount] = useState<number>()
    const [totalCount, setTotalCount] = useState<number>()
    const [loading, setLoading] = useState<boolean>(true)

    const handleSearchOnChange = async () => {
        try {
            const response = await ManagerRepository.listRecords()
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        setLoading(true)

        const fetch = async () => {
            try {
                const dashResponse = await ManagerRepository.dash()
    
                const { docs, nonComplianceCount, registerWithNonComplianceCount, registerWithoutNonComplianceCount, totalCount } = dashResponse.data.data!.dash
    
                setRecords(docs)
                setNonComplianceCount(nonComplianceCount)
                setRegisterWithNonComplianceCount(registerWithNonComplianceCount)
                setRegisterWithoutNonComplianceCount(registerWithoutNonComplianceCount)
                setTotalCount(totalCount)
            } catch (error) {
                router.push('/login/manager')
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [])
      
    return !loading ? (
        <div className=" pl-24 pr-24 pt-10 pb-10 mt-20">
            <div className="mb-10">
                <h1 className="font-bold text-3xl text-zinc-700">Lista de Registros</h1>
            </div>

            <div className="flex mb-14">
                <ChartBox title="Registros" data={totalCount!} />
                <ChartBox title="Registros em conf." data={registerWithoutNonComplianceCount!} />
                <ChartBox title="Registros com não conf." data={registerWithNonComplianceCount!} />
                <ChartBox title="N.º de não conf." data={nonComplianceCount!} lastOne={true} />
            </div>
            
            <div>
                <div className="flex justify-between mb-3">
                    <div className="flex w-[50%]">
                        <input 
                            type="text"
                            className="bg-zinc-100 p-3 rounded-bl-lg rounded-tl-lg outline-none w-[50%]" 
                            placeholder="Buscar registro..."
                            onChange={handleSearchOnChange}    
                        />
                        <div className="bg-zinc-100 p-3 rounded-br-lg rounded-tr-lg"><MagnifyingGlass  size={22}/></div>
                    </div>
                </div>
                <RecordsTable records={records!} />
            </div>
        </div>
    ) : <PageLoading />
}

export default Records