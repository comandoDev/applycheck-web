'use client'

import ManagerRepository from "@/Repositories/ManagerRepository"
import { useEffect, useState } from "react"
import RecordsTable from "./components/RecordsTable"
import ChartBox from "./components/ChartBox"
import { useRouter } from "next/navigation"
import PageLoading from "./components/Record/PageLoading"
import RecordFilters from "./components/RecordFilters"

const Records = () => {
    const router = useRouter()

    const [registerWithNonComplianceCountByMonth, setRegisterWithNonComplianceCountByMonth] = useState<Array<number>>()
    const [registerWithoutNonComplianceCountByMonth, setRegisterWithoutNonComplianceCountByMonth] = useState<Array<number>>()
    const [nonComplianceCountByMonth, setNonComplianceCountByMonth] = useState<Array<number>>()
    const [registerCountByMonth, setRegisterCountByMonth] = useState<Array<number>>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)

        const fetch = async () => {
            try {
                const dashResponse = await ManagerRepository.dash()
                const { 
                    registerWithNonComplianceCountByMonth,
                    registerWithoutNonComplianceCountByMonth, 
                    nonComplianceCountByMonth, 
                    registerCountByMonth 
                } = dashResponse.data.data!.dash
    
                setRegisterWithNonComplianceCountByMonth(registerWithNonComplianceCountByMonth)
                setRegisterWithoutNonComplianceCountByMonth(registerWithoutNonComplianceCountByMonth)
                setNonComplianceCountByMonth(nonComplianceCountByMonth)
                setRegisterCountByMonth(registerCountByMonth)
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
                <ChartBox title="Registros" data={registerCountByMonth!} />
                <ChartBox title="Registros em conf." data={registerWithoutNonComplianceCountByMonth!} />
                <ChartBox title="Registros com não conf." data={registerWithNonComplianceCountByMonth!} />
                <ChartBox title="N.º de não conf." data={nonComplianceCountByMonth!} lastOne={true} />
            </div>
            
            <div>
                <div className="flex justify-between mb-3">
                    <div className="flex w-[50%]">
                        <RecordFilters />
                    </div>
                </div>
                <RecordsTable />
            </div>
        </div>
    ) : <PageLoading />
}

export default Records