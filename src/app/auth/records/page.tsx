'use client'

import ManagerRepository from "@/Repositories/ManagerRepository"
import { IRecord } from "@/interfaces/Record"
import { useEffect, useState } from "react"
import RecordsTable from "./components/RecordsTable"
import StatisticsBox from "./components/StatisticsBox"

const Records = () => {
    const [records, setRecords] = useState<Array<IRecord>>()
    const [nonComplianceCount, setNonComplianceCount] = useState<number>()
    const [registerWithNonComplianceCount, setRegisterWithNonComplianceCount] = useState<number>()
    const [registerWithoutNonComplianceCount, setRegisterWithoutNonComplianceCount] = useState<number>()
    const [totalCount, setTotalCount] = useState<number>()

    useEffect(() => {
        const fetch = async () => {
            const dashResponse = await ManagerRepository.dash()

            const { docs, nonComplianceCount, registerWithNonComplianceCount, registerWithoutNonComplianceCount, totalCount } = dashResponse.data.data!.dash

            setRecords(docs)
            setNonComplianceCount(nonComplianceCount)
            setRegisterWithNonComplianceCount(registerWithNonComplianceCount)
            setRegisterWithoutNonComplianceCount(registerWithoutNonComplianceCount)
            setTotalCount(totalCount)
        }

        fetch()
    }, [])
      
    return (
        <div className="pl-24 pr-24 pt-10 pb-10">
            <div className="mb-10">
                <h1 className="font-bold text-3xl text-zinc-700">Lista de Registros</h1>
            </div>

            <div className="flex mb-14">
                <StatisticsBox title="Registros" data={totalCount!} />
                <StatisticsBox title="Registros em conforme" data={registerWithoutNonComplianceCount!} />
                <StatisticsBox title="Registros com não conformidades" data={registerWithNonComplianceCount!} />
                <StatisticsBox title="N.º de não conformidades" data={nonComplianceCount!} lastOne={true} />
            </div>
            
            <RecordsTable records={records!} />
        </div>
    )
}

export default Records